<script lang="ts" setup>
  import { MENU_BUTTONS_DATA } from "./menubuttons.data";

  const authStore = useAuthStore();
  const router = useRouter();

  const handleNavigation = (item: { url: string }) => {
    if (item.url === "/search") {
      router.push(item.url + "#search");
    } else if (
      item.url === "/user-menu" ||
      item.url === "/favorite" ||
      item.url === "/myaccount/offers/new"
    ) {
      if (authStore.getIsAuthenticated) {
        router.push(item.url);
      } else {
        router.replace("/login");
      }
    }
  };
</script>

<template>
  <nav class="panel__nav">
    <NuxtLink
      v-for="item in MENU_BUTTONS_DATA"
      :key="item.name"
      @click="handleNavigation(item)"
    >
      <Icon :name="item.icon"
        ><span>{{ item.name }}</span></Icon
      >
      <div
        v-if="item.name === 'user' && authStore.getIsAuthenticated"
        class="dropdown"
      >
        <p>Выпадающий блок</p>
      </div>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
  .panel__nav {
    display: flex;
    a {
      border-left: 0.028rem solid #8a7d80;
      padding: 1rem;
      transition: 0.4s;
      position: relative;
    }

    a:last-child {
      font-size: 0.778rem;
      line-height: 0.933rem;
      font-weight: 500;
      background: #981e32;
      color: #ffffff;
      padding: 0.889rem 1.583rem;
      text-transform: uppercase;
      display: flex;
      align-items: center;

      span {
        font-size: 0.778rem;
        line-height: 0.933rem;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }

  .dropdown {
    display: none;
    position: absolute;
    width: 400px;
    height: 400px;
    background-color: blue;
  }

  .panel__nav a:hover .dropdown {
    display: block;
  }
</style>
