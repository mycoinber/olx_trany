<script lang="ts" setup></script>

<template>
  <header class="header">
    <div class="header__top">
      <span
        >Subscribe to the newsletter and receive<strong>BONUSES</strong></span
      >
    </div>

    <div class="header__bottom">
      <div class="header__bottom-inner">
        <NuxtLink to="/" class="logo">
          <NuxtImg src="/logo.svg" alt="logo" width="20px" height="20px" />
        </NuxtLink>

        <LayoutMenu />
      </div>
      <LayoutMenuButtons />
    </div>
  </header>
</template>

<style lang="scss">
  .header {
    background: #ffffff;
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.1);

    &__top {
      background: #141414;
      padding: 0.429rem 0;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.857rem;
        font-weight: 500;
        line-height: 1.029rem;
        color: #ffffff;

        strong {
          color: #ffb612;
          display: flex;
          align-items: center;
          margin-left: 0.286rem;

          &:after {
            content: "";
            width: 0.357rem;
            height: 0.357rem;
            padding: 0.05rem;
            display: inline-block;
            background: #ffb612;
            border-radius: 50%;
            margin-left: 0.286rem;
          }
        }
      }
    }
    &__bottom {
      display: flex;
      justify-content: space-between;

      &-inner {
        padding: 0.929rem 0 0.929rem 2.222rem;
        display: flex;
        justify-content: space-between;
        gap: 2.222rem;
        align-items: center;
      }
      .logo {
        display: block;
        width: 5.556rem;
        height: 1.247rem;
        img {
          display: inline-flex;
          width: 100%;
          height: 100%;
          object-fit: cover;
          justify-content: center;
          align-items: center;
        }
      }
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
</style>
