<script setup>
  const emit = defineEmits(["publish", "save"]);
</script>

<template>
  <div class="wrapper">
    <div class="group">
      <button type="button" @click="emit('save')">
        <span>Save As Draft</span>
      </button>
      <button type="button" @click="emit('publish')">
        <span>Save/Publish</span>
      </button>
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
    gap: 2.5rem;

    .group {
      width: 47.778rem;
      display: flex;
      flex-direction: row;
      gap: 1rem;

      button {
        border-radius: 0.28rem;
        padding: 0.89rem 1.78rem;
        height: 2.72rem;
        background-color: $color-04;

        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: darken($color-04, 10%);
          color: lighten($color-01, 20%);
        }

        span {
          text-transform: uppercase;
          color: $color-01;
          font-size: 0.889rem;
        }
      }
    }
  }
</style>
