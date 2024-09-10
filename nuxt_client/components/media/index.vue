<template>
  <div>
    <div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop">
      <input
        ref="fileInput"
        type="file"
        :multiple="allowMultipleFiles"
        @change="handleFileChange"
        :accept="acceptTypes"
        :disabled="uploadedFiles.length >= maxFiles"
      />

      <div :class="`grid columns-${columnsInRow}`">
        <div v-for="n in maxFiles" :key="n" class="grid-item">
          <div v-if="n <= uploadedFiles.length">
            <div v-if="uploadedFiles[n - 1].loading" class="spinner"></div>
            <img
              v-else
              :src="baseURL + uploadedFiles[n - 1].path"
              :alt="uploadedFiles[n - 1].title"
              class="uploaded-image"
            />
            <Icon
              v-if="!uploadedFiles[n - 1].loading"
              name="jam:minus-rectangle-f"
              width="24"
              height="24"
              class="delete-icon"
              @click="deleteMedia(uploadedFiles[n - 1]._id)"
            />
          </div>
          <div v-else class="skeleton" @click="triggerFileInput">
            <Icon
              name="ph:plus-fill"
              width="32"
              height="32"
              style="color: white"
              class="plus-icon"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();

  const config = useRuntimeConfig();
  const baseURL = process.server
    ? "http://odito_back:3000"
    : config.public.backHost;

  const props = defineProps({
    maxFiles: {
      type: Number,
      default: 14,
    },
    supportVideoExtensions: {
      type: Array,
      default: () => ["mp4", "avi"],
    },
    supportImageExtensions: {
      type: Array,
      default: () => ["jpg", "png"],
    },
    maxVideoSize: {
      type: Number,
      default: 50,
    },
    maxImageSize: {
      type: Number,
      default: 4,
    },
    allowMultipleFiles: {
      type: Boolean,
      default: true,
    },
    columnsInRow: {
      type: Number,
      default: 7,
    },
    uploadedFilesArray: {
      type: Array,
      default: () => [],
    },
  });

  const files = ref([]);
  const uploadedFiles = ref([...props.uploadedFilesArray]);
  const fileInput = ref(null);

  const emit = defineEmits(["update:uploadedFiles", "mediaDeleted"]);

  const acceptTypes = computed(() => {
    const imageTypes = props.supportImageExtensions
      .map((ext) => `image/${ext}`)
      .join(",");
    const videoTypes = props.supportVideoExtensions
      .map((ext) => `video/${ext}`)
      .join(",");
    return [imageTypes, videoTypes].filter(Boolean).join(",");
  });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    processFiles(selectedFiles);
  };

  const handleDrop = (event) => {
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (selectedFiles) => {
    if (selectedFiles.length + uploadedFiles.value.length > props.maxFiles) {
      alert(`Вы можете загрузить максимум ${props.maxFiles} файлов`);
      return;
    }
    files.value = selectedFiles;
    uploadFiles();
  };

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("media", file);
    const response = await $axios.post("/media/upload", formData);
    return response.data;
  };

  const deleteMediaOnServer = async (id) => {
    await $axios.delete(`/media/del/${id}`);
  };

  const queryClient = useQueryClient();
  const { mutate: uploadFilesMutate } = useMutation({
    mutationFn: async (files) => {
      const uploadPromises = files.map((file) => {
        const fileData = {
          _id: Date.now() + file.name,
          title: file.name,
          url: URL.createObjectURL(file),
          loading: true,
        };
        uploadedFiles.value.push(fileData);
        return uploadMedia(file).then((data) => {
          const index = uploadedFiles.value.findIndex(
            (item) => item._id === fileData._id
          );
          uploadedFiles.value[index] = { ...data, loading: false };
          return data;
        });
      });
      const uploadedData = await Promise.all(uploadPromises);
      // Объединяем новые загруженные файлы с уже существующими
      const allMediaFiles = [...uploadedFiles.value];
      emit("update:uploadedFiles", allMediaFiles);
      return uploadedData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData("uploads", data);
    },
    onError: (error) => {
      console.error("Ошибка загрузки файлов:", error);
    },
  });
  const { mutate: deleteMediaMutate } = useMutation({
    mutationFn: deleteMediaOnServer,
    onSuccess: (data, id) => {
      const index = uploadedFiles.value.findIndex((file) => file._id === id);
      if (index !== -1) {
        uploadedFiles.value.splice(index, 1);
      }
      queryClient.invalidateQueries("uploads");
      emit("mediaDeleted", id);
    },
    onError: (error) => {
      console.error("Ошибка удаления файла:", error);
    },
  });

  const uploadFiles = () => {
    if (!files.value.length) {
      alert("Пожалуйста, выберите файлы для загрузки");
      return;
    }
    uploadFilesMutate(files.value);
  };

  const triggerFileInput = () => {
    fileInput.value.click();
  };

  const deleteMedia = (id) => {
    deleteMediaMutate(id);
  };
</script>

<style scoped>
  .drop-zone {
    text-align: center;
    cursor: pointer;
    position: relative;
  }

  .drop-zone input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .single-image {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .single-image img {
    max-width: 100%;
    max-height: 100%;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.444rem;
  }

  .columns-1 {
    grid-template-columns: repeat(1, 1fr);
  }

  .columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  .columns-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  .columns-6 {
    grid-template-columns: repeat(6, 1fr);
  }
  .columns-7 {
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
  }
  .columns-8 {
    grid-template-columns: repeat(8, 1fr);
  }

  .grid-item {
    position: relative;
    height: 9.778rem;
    width: 9.778rem;
    min-width: 9.778rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
  }

  .uploaded-image {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  .skeleton {
    background-color: #e0e0e0;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .plus-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }

  .delete-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
