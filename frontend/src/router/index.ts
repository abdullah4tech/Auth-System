import useAuthStore from '@/stores/authSore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/views/Auth/SignUp.vue'),
      meta: { guest: true }
    },
    {
      path: '/auth/reset',
      name: 'reset password',
      component: () => import('@/views/Auth/Reset.vue'),
      meta: { guest: true }
    },
    {
      path: '/:catchAll(.*)',
      name: '404 page',
      component: () => import('@/views/Error/404.vue'),
    }
  ]
})

router.beforeEach(async (to, from, next) => { 
  const authStore = useAuthStore()
  const isLoggedIn = await authStore.isLogin()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!isLoggedIn) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
