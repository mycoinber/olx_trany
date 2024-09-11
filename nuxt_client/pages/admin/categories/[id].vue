<script setup lang="ts">
  import { ref } from "vue";
  import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
  import instance from "~/utils/axios"; // ваш экземпляр axios
  import { useRouter, useRoute } from "vue-router";

  definePageMeta({
    layout: "admin",
  });

  const router = useRouter();
  const route = useRoute();
  const categoryId = route.params.id as string;

  const queryClient = useQueryClient();

  const fetchCategory = async (id: string) => {
    const response = await instance.get(`/category/${id}`);
    return response.data;
  };

  const {
    data: categoryData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
    enabled: !!categoryId,
  });

  const getFullPhotoUrl = (photoPath: String) => {
    const backendBaseUrl = "http://localhost:3001";
    return `${backendBaseUrl}${photoPath}`;
  };

  const newField = ref<string>("");
  const fieldType = ref("text");
  const fieldOptions = ref([{ title: "", value: "" }]);
  const overview = ref(false);

  const {
    isPending,
    isError: isMutationError,
    error: mutationError,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: (newFieldData) =>
      instance.post("/category-field", newFieldData),
    onSuccess: (data) => {
      newField.value = "";
      fieldType.value = "text";
      fieldOptions.value = [];
      queryClient.invalidateQueries({
        queryKey: ["category-fields", categoryId],
      });
    },
  });

  const todosData = queryClient.getQueryData(["category-fields", categoryId]);

  const addOption = () => {
    fieldOptions.value.push({ title: "", value: "" });
  };

  const removeOption = (index: number) => {
    fieldOptions.value.splice(index, 1);
  };

  const addCategoryField = () => {
    const payload = {
      category: categoryId,
      name: newField.value,
      type: fieldType.value,
      options: fieldOptions.value,
      overview: overview.value,
    };
    mutate(payload);
  };

  const fetchCategoryFields = async (categoryId: string) => {
    const response = await instance.get(`/category-field/cat/${categoryId}`);
    return response.data;
  };

  const { data: categoryFields } = useQuery({
    queryKey: ["category-fields", categoryId],
    queryFn: () => fetchCategoryFields(categoryId),
    enabled: !!categoryId,
  });
</script>

<template>
  <section v-if="categoryData" class="category-details">
    <h1>{{ categoryData.title }}</h1>
    <p>{{ categoryData.description }}</p>
    <img
      :src="getFullPhotoUrl(categoryData.photo)"
      alt="Category photo"
      v-if="categoryData.photo"
    />

    <!-- Отображение полей, связанных с категорией -->
    <div v-for="field in categoryFields" :key="field._id" class="field-item">
      <h3>{{ field.name }}</h3>
      <div
        v-if="
          field.type === 'radio' ||
          field.type === 'select' ||
          field.type === 'checkbox'
        "
        class="options-list"
      >
        <div
          v-for="option in field.options"
          :key="option._id"
          class="option-item"
        >
          {{ option.title }}
        </div>
      </div>
    </div>
    <!-- Форма для добавления новых полей категории -->
    <div class="add-category-field-form">
      <div>
        <input type="checkbox" v-model="overview" id="overview" />
        <label for="overview">Обзор</label>
      </div>
      <div>
        <select v-model="fieldType">
          <option value="text">Текст</option>
          <option value="radio">Радио</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <div>
        <input
          v-model="newField"
          type="text"
          placeholder="Название поля"
          required
        />
      </div>

      <div v-if="fieldType === 'radio' || fieldType === 'checkbox'">
        <div v-for="(option, index) in fieldOptions" :key="index">
          <input
            v-model="option.title"
            type="text"
            placeholder="Название опции"
            required
          />
          <input
            v-model="option.value"
            type="text"
            placeholder="Значение опции"
            required
          />
          <button @click="removeOption(index)">Удалить опцию</button>
        </div>
        <button @click="addOption">Добавить опцию</button>
      </div>

      <button @click="addCategoryField">Добавить Метаданные</button>
    </div>
  </section>
  <div v-else>Loading category...</div>
</template>

<style scoped>
  .field-item {
    margin-bottom: 20px;
  }
  .options-list {
    margin-top: 10px;
    padding-left: 20px;
  }
  .option-item {
    margin-bottom: 5px;
  }
  img {
    width: 200px;
  }
  .add-category-field-form {
    margin-top: 20px;
  }
</style>
