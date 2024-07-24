import { createRouter, createWebHistory } from 'vue-router'
import AuthorsView from '@/views/AuthorsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostsView from '@/views/PostsView.vue'
import SinglePostView from '@/views/SinglePostView.vue'
import LoginView from '@/views/LoginView.vue'

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
      path: '/posts',
      name: 'posts',
      component: PostsView
    },
    {
      path: '/posts/:id',
      name: 'singlepost',
      component: SinglePostView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView
    }
  ]
})

export default router
