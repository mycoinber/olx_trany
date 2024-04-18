<script lang="ts" setup>
</script>

<template>
  <aside class="sidebar">
    <NuxtLink to="/">
      <NuxtImg src="/logo.svg" alt="" width="100px" />
    </NuxtLink>
    <button>
      <Icon name="line-md:logout" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<style lang="scss" >
.sidebar {
  height: 100vh;

  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0.7511379551820728) 0%,
    rgba(9, 9, 121, 1) 48%,
    rgba(0, 212, 255, 0.896796218487395) 100%
  );
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
    .icon{
      width: auto !important;
      height: auto !important;;
      span {
      
      font-size: 1rem;
      color: $white;
      display: block;
    }
    }
    
  }
}
</style>