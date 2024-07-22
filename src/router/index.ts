import { createRouter, createWebHistory } from 'vue-router'
import AuthorsView from '@/views/AuthorsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'authors',
      alias: '/authors',
      component: AuthorsView
    },
  ]
})

export default router
