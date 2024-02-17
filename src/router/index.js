import { createRouter, createWebHistory } from 'vue-router'
import {useTokenStore} from "@/stores/token.js"
import LoginVue from "@/views/LoginVue.vue";
import AdminLayoutView from "@/views/layouts/AdminLayoutView.vue";
import DashboardVue from "@/views/pages/DashboardVue.vue";
import UserVue from "@/views/pages/User/UserVue.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/admin',
      component: AdminLayoutView,
      children: [
        {
          path: 'dashboard',
          name: 'admin.dashboard',
          component: DashboardVue
        },
        {
          path: 'users',
          name: 'admin.users.index',
          component: UserVue
        }
      ]
    }
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
