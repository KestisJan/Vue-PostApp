<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/common/NavBar.vue';
import Notifications from '@/components/common/NotificationsList.vue'


</script>

<template>
  <NavBar/>
  <RouterView />
  <Notifications />
</template>

<style scoped>
</style>
