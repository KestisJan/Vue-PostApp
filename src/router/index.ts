import { createRouter, createWebHistory } from 'vue-router'
import AuthorsView from '@/views/AuthorsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'authors',
      alias: '/authors',
      component: AuthorsView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView
    }
  ]
})

export default router
