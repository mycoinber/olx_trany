<template>
  <transition-group name="fade" tag="div" class="notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="notification.type"
    >
      <strong>{{ notification.title }}</strong>
      <p>{{ notification.message }}</p>
      <button @click="close(notification.id)">✖</button>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const store = useNotificationStore();
  const notifications = computed(() => store.notifications);

  const close = (id: number) => {
    store.removeNotification(id);
  };
</script>

<style scoped>
  .notification-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .notification {
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notification.success {
    background-color: #4caf50;
  }

  .notification.error {
    background-color: #f44336;
  }

  .notification.info {
    background-color: #2196f3;
  }

  .notification.warning {
    background-color: #ff9800;
  }

  .notification button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
</style>
