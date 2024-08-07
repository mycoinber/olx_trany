<script lang="ts" setup></script>

<template>
  <aside class="sidebar">
    <NuxtLink to="/">
      <NuxtImg src="/logo.svg" alt="" width="100px" />
    </NuxtLink>
    <button>
      <Icon name="line-md:logout" />
    </button>
    <AdminMenu />
  </aside>
</template>

<style lang="scss">
  .sidebar {
    height: 100vh;

    background-color: #fff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.1);
    aside {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      a {
        display: inline-flex;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
      .icon {
        width: auto !important;
        height: auto !important;
        span {
          font-size: 1rem;
          color: black;
          display: block;
        }
      }
    }
  }
</style>
