<script setup lang="ts">
  definePageMeta({
    layout: "admin",
  });

  import { ref } from "vue";
  import { useMutation } from "@tanstack/vue-query";
  import instance from "~/utils/axios"; // ваш экземпляр axios

  const router = useRouter();

  const formData = ref({
    title: "",
    description: "",
    categoryImage: null,
  });

  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newCategory) => {
      const formDataToSend = new FormData();
      for (const key in newCategory) {
        formDataToSend.append(key, newCategory[key]);
      }
      return instance.post("/category", formDataToSend);
    },
    onSuccess: (data) => {
      const { _id: categoryId } = data.data; // Деструктуризация для получения _id
      if (categoryId) {
        router.push(`/admin/categories/${categoryId}`).catch((err) => {
          console.error("Router error:", err);
        });
      } else {
        console.error("No category ID returned from the server.");
      }
    },
  });

  const handlePhotoChange = (event) => {
    formData.value.categoryImage = event.target.files[0];
  };

  const handleSubmit = () => {
    mutate({ ...formData.value });
  };
</script>

<template>
  <section>
    <h1>Create Category</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
        ></textarea>
      </div>
      <div>
        <label for="categoryImage">Photo:</label>
        <input type="file" id="categoryImage" @change="handlePhotoChange" />
      </div>
      <button type="submit">Create</button>
    </form>
    <span v-if="isPending">Creating category...</span>
    <span v-else-if="isError">An error occurred: {{ error?.message }}</span>
    <span v-else-if="isSuccess">Category created!</span>
  </section>
</template>
