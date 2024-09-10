<script setup>
  import { ref, computed } from "vue";
  import { onClickOutside } from "@vueuse/core";

  const props = defineProps({
    errors: {
      type: Object,
      default: () => ({}),
    },
    reset: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const formData = ref({
    title: props.data.title || "",
    typeOfHouse: props.data.typeOfHouse || "",
    category: props.data.category || "Sale",
    status: props.data.status || "Live",
    propertyType: props.data.propertyType || "residential",
  });

  const categories = ["Sale", "Rent", "Both"];

  const status = [
    { slug: "live", title: "Live" },
    { slug: "draft", title: "Draft" },
    { slug: "withdrawn", title: "Withdrawn" },
    { slug: "sold", title: "Sold" },
    { slug: "leased", title: "Leased" },
    { slug: "deleted", title: "Deleted" },
    // { slug: "rejected", title: "Rejected" },
    // { slug: "pending_approval", title: "Pending Approval" },
  ];

  const tProperties = {
    commercial: [
      { slug: "apartment", title: "Apartment" },
      { slug: "BlockOfUnits", title: "Block of Units" },
      { slug: "Duplex", title: "Duplex" },
      { slug: "House", title: "House" },
      { slug: "Land", title: "Land" },
      { slug: "ServicedApartment", title: "Serviced Apartment" },
      { slug: "Townhouse", title: "Townhouse" },
      { slug: "Bedsit", title: "Bedsit" },
    ],
    residential: [
      { slug: "Land", title: "Land" },
      { slug: "Hotel", title: "Hotel" },
      { slug: "Industrial", title: "Industrial" },
      { slug: "Offices", title: "Offices" },
      { slug: "Retail", title: "Retail" },
      { slug: "Office", title: "Office" },
      { slug: "Warehouse", title: "Warehouse" },
    ],
  };

  const selectedType = ref("residential");
  const maxChars = 70;
  const dropdownStates = ref({
    typeOfHouse: {
      isOpen: false,
      selected: props.data.typeOfHouse || "",
    },
    category: {
      isOpen: false,
      selected: props.data.category || "Sale",
    },
    status: {
      isOpen: false,
      selected: props.data.status || "Live",
    },
  });

  const filteredProperties = computed(() => tProperties[selectedType.value]);

  const toggleDropdown = (dropdownKey) => {
    dropdownStates.value[dropdownKey].isOpen =
      !dropdownStates.value[dropdownKey].isOpen;
  };

  const selectItem = (dropdownKey, item, event) => {
    event.stopPropagation();
    dropdownStates.value[dropdownKey].selected = item;
    dropdownStates.value[dropdownKey].isOpen = false;
    formData.value[dropdownKey] = item;
  };

  // Закрытие dropdown при клике вне его области
  const categoryDropdownRef = ref(null);
  const typeOfHouseDropdownRef = ref(null);
  const statusRef = ref(null);
  onClickOutside(categoryDropdownRef, () => {
    dropdownStates.value.category.isOpen = false;
  });

  onClickOutside(typeOfHouseDropdownRef, () => {
    dropdownStates.value.typeOfHouse.isOpen = false;
  });

  onClickOutside(statusRef, () => {
    dropdownStates.value.status.isOpen = false;
  });

  watch(selectedType, () => {
    dropdownStates.value.typeOfHouse.selected = "";
    formData.value.typeOfHouse = "";
    formData.value.propertyType = selectedType.value;
  });

  const emit = defineEmits(["update:formData"]);

  watch(
    formData,
    () => {
      emit("update:formData", formData.value);
    },
    { deep: true }
  );

  const headlineRef = ref(null);

  watch(
    () => props.errors,
    (newErrors) => {
      if (
        Object.keys(newErrors).length > 0 &&
        Object.keys(newErrors).findIndex(
          (key) => key === "title" || key === "typeOfHouse"
        ) === 0
      ) {
        nextTick(() => {
          headlineRef.value?.scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    { immediate: true, deep: true }
  );

  const { reset } = toRefs(props);

  watch(reset, () => {
    formData.value.title = "";
    formData.value.typeOfHouse = "";
  });
</script>

<template>
  <div class="wrapper" ref="headlineRef">
    <div class="headline">
      <h2>Describe in detail</h2>
      <span>1/8</span>
    </div>

    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span v-if="props.errors.headline" class="error-message">
            {{ props.errors.headline }}
          </span>
          <span v-else>Please enter Headline:</span>
        </div>

        <span>{{ formData.title.length }}/{{ maxChars }}</span>
      </div>
      <input
        type="text"
        required
        id="nameInput"
        placeholder="Headline"
        v-model="formData.title"
        :maxlength="maxChars"
      />
    </div>

    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span>Status</span>
        </div>
      </div>
      <div
        class="custom-select"
        @click="toggleDropdown('status')"
        ref="statusRef"
      >
        <div class="selected">
          <span>{{ dropdownStates.status.selected || "Choose satus" }}</span>
          <!-- Добавлен динамический класс rotate -->
          <div class="icon" :class="{ rotate: dropdownStates.status.isOpen }">
            <Icon name="oui:arrow-down" />
          </div>
        </div>
        <ul v-if="dropdownStates.status.isOpen" class="options">
          <li
            v-for="(st, index) in status"
            :key="index"
            @click="selectItem('status', st.slug, $event)"
          >
            {{ st.title }}
          </li>
        </ul>
      </div>
    </div>

    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span
            >Select whether your property is for SALE or for RENT or BOTH</span
          >
        </div>
      </div>
      <div
        class="custom-select"
        @click="toggleDropdown('category')"
        ref="categoryDropdownRef"
      >
        <div class="selected">
          <span>{{ dropdownStates.category.selected || "Choose type" }}</span>
          <!-- Добавлен динамический класс rotate -->
          <div class="icon" :class="{ rotate: dropdownStates.category.isOpen }">
            <Icon name="oui:arrow-down" />
          </div>
        </div>
        <ul v-if="dropdownStates.category.isOpen" class="options">
          <li
            v-for="(category, index) in categories"
            :key="index"
            @click="selectItem('category', category, $event)"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </div>

    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span>Private or business</span>
        </div>
      </div>
      <div class="row bussines">
        <div>
          <input
            type="radio"
            id="residential"
            value="residential"
            v-model="selectedType"
          />
          <label for="residential">Residential</label>
        </div>
        <div>
          <input
            type="radio"
            id="commercial"
            value="commercial"
            v-model="selectedType"
          />
          <label for="commercial">Commercial</label>
        </div>
      </div>
    </div>

    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span v-if="props.errors.typeOfHouse" class="error-message">
            {{ props.errors.typeOfHouse }}
          </span>
          <span v-else>Type of property:</span>
        </div>
      </div>
      <div
        class="custom-select"
        @click="toggleDropdown('typeOfHouse')"
        ref="typeOfHouseDropdownRef"
      >
        <div class="selected">
          <span>{{
            dropdownStates.typeOfHouse.selected || "Choose type"
          }}</span>
          <!-- Добавлен динамический класс rotate -->
          <div
            class="icon"
            :class="{ rotate: dropdownStates.typeOfHouse.isOpen }"
          >
            <Icon name="oui:arrow-down" />
          </div>
        </div>
        <ul v-if="dropdownStates.typeOfHouse.isOpen" class="options">
          <li
            v-for="(tProperty, index) in filteredProperties"
            :key="index"
            @click="selectItem('typeOfHouse', tProperty.title, $event)"
          >
            {{ tProperty.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .error-message {
    color: red;
  }
  .wrapper {
    width: 100%;
    padding: 2.222rem;
    background-color: #fff;
    border-radius: 0.313rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .headline {
      font-size: 1.33rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .group {
      width: 47.778rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .bussines {
        display: flex;
        flex-direction: row;
        gap: 0.889rem;

        div {
          width: 16rem;
        }

        input[type="radio"] {
          display: none;
        }

        label {
          display: flex;
          border-radius: 0.28rem;
          justify-content: center;
          width: 100%;
          font-size: 0.78rem;
          background-color: #f0f0f0;
          cursor: pointer;
          text-transform: uppercase;
          transition: background-color 0.3s, border-color 0.3s;
          color: #333;
          padding: 0.889rem;
        }

        input[type="radio"]:checked + label {
          background-color: $color-04;
          color: white;
        }

        label:hover {
          background-color: #e0e0e0;
          border-color: #bbb;
        }

        label:active {
          background-color: #d0d0d0;
        }
      }

      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #8a7d80;
        .icon {
          display: flex;
          margin-right: 0.4rem;
          align-items: center;

          svg {
            width: 1.2rem;
            height: 1.2rem;
            color: $color-04;
          }
        }
      }

      input {
        font-size: 0.875rem;
        color: black;
        padding: 0.889rem;
        border-radius: 0.313rem;
        background-color: #f4f4f4;

        &::placeholder {
          color: #141414;
          text-transform: uppercase;
          font-weight: 500;
        }
      }

      .custom-select {
        position: relative;
        font-size: 0.875rem;
        color: black;
        padding: 0.889rem;
        border-radius: 0.313rem;
        background-color: #f4f4f4;
        cursor: pointer;

        .selected {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .options {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 0.313rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          z-index: 10;

          li {
            padding: 1rem;
            cursor: pointer;
            &:hover {
              background-color: #f4f4f4;
            }
          }
        }
      }
    }
  }
  .icon {
    transition: transform 0.3s; /* Анимация поворота */

    /* Поворот на 180 градусов при добавлении класса .rotate */
    &.rotate {
      transform: rotate(180deg);
    }

    svg {
      width: 0.556rem;
      object-fit: contain;
    }
  }
</style>
