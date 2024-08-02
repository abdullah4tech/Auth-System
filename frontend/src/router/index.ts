import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue')
    },
    {
      path: '/auth/reset',
      name: 'reset password',
      component: () => import('@/views/Auth/PasswordReset.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404 page',
      component: () => import('@/views/Error/404.vue')
    }
  ]
})

export default router
