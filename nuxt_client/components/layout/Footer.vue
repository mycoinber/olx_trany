<script lang="ts" setup>
const currentYear = ref<number>(new Date().getFullYear());

onMounted(() => {
  const updateYear = () => {
    currentYear.value = new Date().getFullYear();
  };

  const interval = setInterval(updateYear, 24 * 60 * 60 * 1000);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="foooter-wrapper">
        <div class="footer-top">
          <NuxtLink to="/" class="footer-logo">
            <NuxtImg src="/logo.svg" alt="logo" width="20px" height="20px" />
          </NuxtLink>
        </div>
        <div class="footer-bottom">
          <span class="footer-copyright">
            © Copyright 2000-{{ currentYear }} name. All rights reserved.
          </span>
          <LayoutFooterSubMenu />
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background: #ffffff;
  padding: 3.556rem 0 1.333rem;

  &-logo {
    width: 9.556rem;
    height: 2.2rem;
    margin-bottom: 3.389rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-copyright {
    font-weight: 500;
    font-size: 0.778rem;
    line-height: 0.933rem;
    color: #141414;
    text-transform: uppercase;
  }
}
</style>
