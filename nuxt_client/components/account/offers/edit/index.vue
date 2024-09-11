<script setup>
  import { ref } from "vue";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();

  const queryClient = useQueryClient();

  const formData = ref({});
  const validationErrors = ref({});
  const reset = ref(false);

  const router = useRouter();

  const route = useRoute();
  const { id: offerId } = route.params;
  console.log("offer id", offerId);

  const notification = useNotificationStore();

  const fetchOffer = async (id) => {
    const response = await $axios.get(`/offer/get-offer-edit/${id}`);
    return response.data;
  };

  const { data: offerData, isLoading: oisLoading } = useQuery({
    queryKey: computed(() => ["offer", offerId]),
    queryFn: () => fetchOffer(offerId),
  });

  const offerCreate = async (data) => {
    const response = await $axios.patch(`/offer/${offerId}`, data);

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
        "Offer has been successfully updated."
      );
      queryClient.invalidateQueries({ queryKey: ["offer", offerId] });
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

    const { title, typeOfHouse, media, salePrice, pricePm, description, city } =
      formData.value;
    let isValid = true;

    if (!title && !offerData.value.title) {
      validationErrors.value.title = "Headline is required.";
      isValid = false;
    }
    if (!typeOfHouse && !offerData.value.typeOfHouse) {
      validationErrors.value.typeOfHouse = "Type of property is required.";
      isValid = false;
    }
    if (!media && !offerData.value.media) {
      validationErrors.value.media = "Media is required.";
      isValid = false;
    }
    if (!salePrice && !offerData.value.salePrice) {
      validationErrors.value.salePrice = "Sale price is required.";
      isValid = false;
    }
    if (!pricePm && !offerData.value.pricePm) {
      validationErrors.value.pricePm = "Price per м² is required.";
      isValid = false;
    }
    if (
      (!description || description.length < 40) &&
      !offerData.value.description
    ) {
      validationErrors.value.description = "Required minimum 40 characters";
      isValid = false;
    }
    if (!city && !offerData.value.city) {
      validationErrors.value.city = "Location is required.";
      isValid = false;
    }

    if (!isValid) {
      // alert("Please fill in all required fields.");
    }

    return isValid;
  };

  const handlePublish = () => {
    if (validateForm()) {
      createOffer({ active: true, ...formData.value });
    }
  };
  const handleSave = () => {
    createOffer({ active: false, ...formData.value });
  };
</script>

<template>
  <div class="container" v-if="offerData">
    <!-- Передаем обработчик в каждый дочерний компонент -->
    <AccountOffersEditTitle
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditBadge
      @update:formData="updateFormData"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditMedia
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditPrice
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditDescr
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditDetails
      @update:formData="updateFormData"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditFeatures
      @update:formData="updateFormData"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditLocation
      @update:formData="updateFormData"
      :errors="validationErrors"
      :reset="reset"
      :data="offerData"
    />
    <AccountOffersEditButtons @publish="handlePublish" @save="handleSave" />
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
