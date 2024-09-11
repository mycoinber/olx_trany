<script setup>
  import { ref } from "vue";

  const maxChars = 9000;
  const headline = ref("");

  const emit = defineEmits(["update:formData"]);

  watch(
    headline,
    () => {
      emit("update:formData", { description: headline.value });
    },
    { deep: true }
  );

  const props = defineProps({
    errors: {
      type: Object,
      default: () => ({}),
    },
    reset: {
      type: Boolean,
      default: false,
    },
  });

  const descriptionRef = ref(null);

  watch(
    () => props.errors,
    (newErrors) => {
      if (
        Object.keys(newErrors).length > 0 &&
        Object.keys(newErrors).indexOf("description") === 0
      ) {
        nextTick(() => {
          descriptionRef.value?.scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    { immediate: true, deep: true }
  );

  const { reset } = toRefs(props);

  watch(reset, () => {
    headline.value = "";
  });
</script>

<template>
  <div class="wrapper" ref="descriptionRef">
    <div class="headline">
      <h2>Description*</h2>
      <span>5/8</span>
    </div>
    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span v-if="props.errors.description" class="error-message">
            {{ props.errors.description }}
          </span>
          <span v-else>Minimum 40 characters</span>
        </div>
        <span>{{ headline.length }}/{{ maxChars }}</span>
      </div>
      <textarea
        name=""
        id=""
        placeholder="Describe the property details"
        v-model="headline"
      ></textarea>
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

      input,
      textarea {
        font-size: 0.875rem;
        color: black;
        padding: 1rem;
        border-radius: 0.313rem;
        background-color: $color-01;

        &::placeholder {
          color: #141414;
          text-transform: uppercase;
          font-weight: 500;
        }
      }

      textarea {
        width: 47.778rem;
        height: 13.056rem;
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
</style>
