<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useMutation, useQuery } from "@tanstack/vue-query";
  import instance from "~/utils/axios";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const formData = ref({
    title: "",
    description: "",
    price: "",
    category: "",
    images: null,
    metadata: {}, // Initialize metadata as an object
  });

  const fetchCategories = async () => {
    const response = await instance.get("/category");
    return response.data;
  };

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (newOffer) => {
      const formDataToSend = new FormData();
      for (const key in newOffer) {
        if (key === "images") {
          Array.from(newOffer[key]).forEach((image) => {
            formDataToSend.append(key, image);
          });
        } else if (key === "metadata") {
          newOffer[key].forEach((field) => {
            formDataToSend.append(
              `metadata[${field.fieldId}]`,
              JSON.stringify(field)
            );
          });
        } else {
          formDataToSend.append(key, newOffer[key]);
        }
      }
      return instance.post("/offer", formDataToSend);
    },
    onSuccess: (data) => {
      const { _id: offerId } = data.data;
      if (offerId) {
        router.push(`/myaccount/offers/${offerId}`).catch((err) => {
          console.error("Router error:", err);
        });
      } else {
        console.error("No offer ID returned from the server.");
      }
    },
  });

  const handleImagesChange = (event) => {
    formData.value.images = event.target.files;
  };

  const handleSubmit = () => {
    const metadataToSend = Object.entries(formData.value.metadata).map(
      ([fieldId, value]) => {
        const field = categoryFieldsData.value.find(
          (field) => field._id === fieldId
        );
        return {
          fieldId,
          name: field.name,
          value: Array.isArray(value) ? value : [value],
        };
      }
    );

    mutate({ ...formData.value, metadata: metadataToSend });
  };

  const handleCheckboxChange = (fieldId, value) => {
    if (!formData.value.metadata[fieldId]) {
      formData.value.metadata[fieldId] = [];
    }
    const index = formData.value.metadata[fieldId].indexOf(value);
    if (index === -1) {
      formData.value.metadata[fieldId].push(value);
    } else {
      formData.value.metadata[fieldId].splice(index, 1);
    }
  };

  const categoryFieldsData = ref([]);

  const fetchCategoryFields = async (categoryId) => {
    const response = await instance.get(`/category-field/cat/${categoryId}`);
    return response.data;
  };

  const {
    data: categoryFields,
    isPending: isFetchingCategoryFields,
    isError: fetchCategoryFieldsError,
    refetch: refetchCategoryFields,
  } = useQuery({
    queryKey: ["category-fields", ref(() => formData.value.category)],
    queryFn: () => fetchCategoryFields(formData.value.category),
    enabled: false,
  });

  watch(
    () => formData.value.category,
    (newCategoryId) => {
      if (newCategoryId) {
        refetchCategoryFields();
      } else {
        categoryFieldsData.value = [];
      }
    }
  );

  watch(
    categoryFields,
    (newFields) => {
      if (newFields) {
        categoryFieldsData.value = newFields;
      }
    },
    { immediate: true }
  );
</script>

<template>
  <section>
    <h1>Create Offer</h1>
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
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="formData.price" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <select id="category" v-model="formData.category" required>
          <option disabled value="">Please select a category</option>
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>

      <div v-for="field in categoryFieldsData" :key="field._id">
        <label :for="field.name">{{ field.name }}</label>
        <input
          v-if="field.type === 'text'"
          type="text"
          :id="field.name"
          v-model="formData.metadata[field._id]"
        />
        <select
          v-else-if="field.type === 'select'"
          :id="field.name"
          v-model="formData.metadata[field._id]"
        >
          <option
            v-for="option in field.options"
            :key="option._id"
            :value="option.value"
          >
            {{ option.title }}
          </option>
        </select>
        <div v-else-if="field.type === 'radio'" :id="field.name">
          <div v-for="option in field.options" :key="option._id">
            <input
              type="radio"
              :id="option._id"
              :value="option.value"
              v-model="formData.metadata[field._id]"
            />
            <label :for="option._id">{{ option.title }}</label>
          </div>
        </div>
        <div v-else-if="field.type === 'checkbox'" :id="field.name">
          <div v-for="option in field.options" :key="option._id">
            <input
              type="checkbox"
              :id="option._id"
              :value="option.value"
              @change="handleCheckboxChange(field._id, option.value)"
              :checked="
                formData.metadata[field._id] &&
                formData.metadata[field._id].includes(option.value)
              "
            />
            <label :for="option._id">{{ option.title }}</label>
          </div>
        </div>
      </div>

      <div>
        <label for="images">Images:</label>
        <input type="file" id="images" @change="handleImagesChange" multiple />
      </div>
      <button type="submit">Create</button>
    </form>
    <span v-if="isPending">Creating offer...</span>
    <span v-else-if="isError">An error occurred: {{ error?.message }}</span>
    <span v-else-if="isSuccess">Offer created!</span>
  </section>
</template>
