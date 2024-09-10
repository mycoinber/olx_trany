<script setup>
  import { ref } from "vue";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();

  const formData = ref({
    category: "Sale",
  });
  const validationErrors = ref({});
  const reset = ref(false);

  const notification = useNotificationStore();

  const router = useRouter();

  const offerCreate = async (data) => {
    const response = await $axios.post("/offer", data);

    return response.data;
  };

  const {
    mutate: createOffer,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: offerCreate,
    onSuccess: (data) => {
      reset.value = true;
      notification.addNotification(
        "success",
        "Success",
        "Offer has been successfully created."
      );
      router.push("/myaccount/offers");
    },
    onError: (error) => {
      console.error("Error creating funnel:", error);
    },
  });

  const updateFormData = (newData) => {
    formData.value = { ...formData.value, ...newData };
    console.log(formData.value);
  };

  const resetValidationErrors = () => {
    validationErrors.value = {};
  };

  const validateForm = () => {
    resetValidationErrors();

    const {
      title,
      typeOfHouse,
      media,
      salePrice,
      pricePm,
      description,
      city,
      category,
      rentPrice,
      rentPm,
    } = formData.value;
    let isValid = true;

    if (!title) {
      validationErrors.value.title = "Headline is required.";
      isValid = false;
    }
    if (!typeOfHouse) {
      validationErrors.value.typeOfHouse = "Type of property is required.";
      isValid = false;
    }
    if (!media) {
      validationErrors.value.media = "Media is required.";
      isValid = false;
    }
    if (category === "Rent") {
      if (!rentPrice) {
        validationErrors.value.salePrice = "Rent price is required.";
        isValid = false;
      }
      if (!rentPm) {
        validationErrors.value.pricePm = "Price per м² is required.";
        isValid = false;
      }
    }
    if (category === "Sale") {
      if (!salePrice) {
        validationErrors.value.salePrice = "Sale price is required.";
        isValid = false;
      }
      if (!pricePm) {
        validationErrors.value.pricePm = "Price per м² is required.";
        isValid = false;
      }
    }
    if (category === "Both") {
      if (!salePrice) {
        validationErrors.value.salePrice = "Sale price is required.";
        isValid = false;
      }
      if (!pricePm) {
        validationErrors.value.pricePm = "Price per м² is required.";
        isValid = false;
      }
      if (!rentPrice) {
        validationErrors.value.salePrice = "Rent price is required.";
        isValid = false;
      }
      if (!rentPm) {
        validationErrors.value.pricePm = "Price per м² is required.";
        isValid = false;
      }
    }
    if (!description || description.length < 40) {
      validationErrors.value.description = "Required minimum 40 characters";
      isValid = false;
    }
    if (!city) {
      validationErrors.value.city = "Location is required.";
      isValid = false;
    }

    if (!isValid) {
      // alert("Please fill in all required fields.");
    }

    return isValid;
  };

  const handlePublish = () => {
    console.log(formData.value);
    if (validateForm()) {
      createOffer({ active: true, ...formData.value });
    }
  };
  const handleSave = () => {
    createOffer({ active: false, ...formData.value });
  };
</script>

<template>
  <div class="container">
    <!-- Передаем обработчик в каждый дочерний компонент -->
    <AccountOffersAddTitle
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
    />
    <AccountOffersAddBadge @update:formData="updateFormData" :reset="reset" />
    <AccountOffersAddMedia
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
    />
    <AccountOffersAddPrice
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
      :category="formData.category || 'Sale'"
    />
    <AccountOffersAddDescr
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
    />
    <AccountOffersAddDetails @update:formData="updateFormData" :reset="reset" />
    <AccountOffersAddFeatures
      @update:formData="updateFormData"
      :reset="reset"
    />
    <AccountOffersAddLocation
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
    />
    <AccountOffersAddButtons @publish="handlePublish" @save="handleSave" />
  </div>
</template>

<style scoped lang="scss">
  .container,
  .details,
  .confirmation {
    display: flex;
    flex-direction: column;
    gap: 0.889rem;
  }
</style>
