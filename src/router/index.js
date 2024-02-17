import { createRouter, createWebHistory } from 'vue-router'
import {useTokenStore} from "@/stores/token.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginVue.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutVue.vue')
    },
  ]
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  const store = useTokenStore()
  if (!store.isAuthenticated && to.name !== 'login') {
    return {name: 'login'}
  }
  return true
})

export default router
