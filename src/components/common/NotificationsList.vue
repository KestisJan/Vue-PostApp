<script setup lang="ts">
import { useNotificationStore } from '@/stores/NotificationStore'
import { computed } from 'vue';

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications);


</script>

<template>
    <div class="notification-container">
    <div 
      v-for="notification in notifications" 
      :key="notification.id"
      :class="[
        'notification',
        `is-${notification.type}`,
        'is-light',
        'mb-3',
        'p-3',
        'has-text-weight-bold',
        'has-text-centered',
        'is-size-5',
        'notification-size'
      ]"
    >
      <div class="notification-content">
        <div class="icon-container">
          <span class="icon is-large">
            <i 
              :class="{
                'fas': true,
                'fa-exclamation-triangle': notification.type === 'warning',
                'fa-exclamation-circle': notification.type === 'danger',
                'fa-check-circle': notification.type === 'success'
              }"
              class="fa-3x"
            ></i>
          </span>
        </div>
        <div class="text-container">
          <span>{{ notification.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.notification-container {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  max-width: 20%;
  z-index: 9999;
}

.notification-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align items horizontally */
}

.icon-container {
  margin-bottom: 0.5rem; /* Space between icon and text */
}

.text-container {
  text-align: center; /* Center align text */
}


</style>