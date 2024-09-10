import { defineStore } from "pinia";
import { ref } from "vue";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  duration: number;
}

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref<Notification[]>([]);
  let notificationId = 0;

  const addNotification = (
    type: string,
    title: string,
    message: string,
    duration = 3000
  ) => {
    const id = notificationId++;
    notifications.value.push({ id, type, title, message, duration });

    // Удаляем уведомление через `duration` миллисекунд
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id: number) => {
    const initialLength = notifications.value.length;
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id
    );
    const finalLength = notifications.value.length;

    if (initialLength !== finalLength) {
      console.log(`Notification with ID: ${id} removed successfully.`);
    } else {
      console.warn(`Failed to remove notification with ID: ${id}.`);
    }
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
});
