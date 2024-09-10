<script setup>
  import { ref } from "vue";

  const selectedFurnisher = ref("");

  const formData = ref({
    floorLevel: "",
    nFloors: "",
    totalArea: "",
    lendArea: "",
    floorArea: "",
    bedroom: "",
    bathroom: "",
    parking: "",
    furnishing: "",
  });

  const emit = defineEmits(["update:formData"]);

  watch(
    selectedFurnisher,
    () => {
      formData.value.furnishing = selectedFurnisher.value;
    },
    { deep: true }
  );

  watch(
    formData,
    () => {
      emit("update:formData", formData.value);
    },
    { deep: true }
  );

  const props = defineProps({
    reset: {
      type: Boolean,
      default: false,
    },
  });

  const { reset } = toRefs(props);

  watch(reset, () => {
    formData.value.floorLevel = "";
    formData.value.nFloors = "";
    formData.value.totalArea = "";
    formData.value.lendArea = "";
    formData.value.floorArea = "";
    formData.value.bedroom = "";
    formData.value.bathroom = "";
    formData.value.parking = "";
    formData.value.furnishing = "";
  });
</script>

<template>
  <div class="wrapper">
    <div class="headline">
      <h2>Additional Info*</h2>
      <span>6/8</span>
    </div>

    <div class="group">
      <div class="title">
        <span>Floor Level:</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder=""
        v-model="formData.floorLevel"
      />
    </div>

    <div class="group">
      <div class="title">
        <span>Number of floors*</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder=""
        v-model="formData.nFloors"
      />
    </div>

    <div class="group">
      <div class="title">
        <span>Total area*</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder="м²"
        v-model="formData.totalArea"
      />
    </div>

    <div class="group">
      <div class="title">
        <span>Land Area:</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder="м²"
        v-model="formData.lendArea"
      />
    </div>
    <div class="group">
      <div class="title">
        <span>Floor Area:</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder="м²"
        v-model="formData.floorArea"
      />
    </div>
    <div class="group">
      <div class="title">
        <span>Bedroom:</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder=""
        v-model="formData.bedroom"
      />
    </div>
    <div class="group">
      <div class="title">
        <span>Bathroom:</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder=""
        v-model="formData.bathroom"
      />
    </div>
    <div class="group">
      <div class="title">
        <span>Parking:</span>
      </div>
      <input
        type="number"
        id="nameInput"
        placeholder=""
        v-model="formData.parking"
      />
    </div>

    <div class="group">
      <div class="title">
        <span>Furnishing</span>
      </div>
      <div class="row bussines">
        <div>
          <input
            type="radio"
            id="without"
            value="without"
            v-model="selectedFurnisher"
          />
          <label for="without">Without furniture</label>
        </div>
        <div>
          <input
            type="radio"
            id="with"
            value="with"
            v-model="selectedFurnisher"
          />
          <label for="with">With furniture</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

    .apiliance {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 2rem;
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

        /* Label as a button */
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

        /* Change appearance when the radio input is checked */
        input[type="radio"]:checked + label {
          background-color: $color-04; /* Green background when selected */
          color: white;
        }

        /* Hover effect */
        label:hover {
          background-color: #e0e0e0;
          border-color: #bbb;
        }

        /* Active (clicked) state */
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
        padding: 1rem;
        border-radius: 0.313rem;
        background-color: #f4f4f4;
        cursor: pointer;

        .selected {
          display: flex;
          justify-content: space-between;
          align-items: center;

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
    .checkboxes {
      width: fit-content;

      .checkbox-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .checkbox-item {
          display: flex;
          align-items: center;
          cursor: pointer;

          input[type="checkbox"] {
            display: none;
          }

          .custom-checkbox {
            width: 1rem;
            height: 1rem;
            border: 1px solid #000;
            display: inline-block;
            margin-right: 0.5rem;
            position: relative;
            border-radius: 0.3rem;
          }

          input[type="checkbox"]:checked + .custom-checkbox {
            background-color: #000;
          }

          input[type="checkbox"]:checked + .custom-checkbox::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.5rem;
            height: 0.5rem;
            background-color: #fff;
            transform: translate(-50%, -50%);
            border-radius: 0.1rem;
          }

          .label-text {
            font-size: 0.875rem;
            color: $color-02;
            text-transform: uppercase;
            opacity: 0.2;
            transition: opacity 0.3s;
          }

          input[type="checkbox"]:checked + .custom-checkbox + .label-text {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
