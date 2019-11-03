import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import Content from '@/layout/Content'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/dashboard',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard/',
          name: 'dashboard',
          props: true,
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          props: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    },
    {
      path: '/notifications',
      // redirect: 'notifications',
      component: Content,
      children: [
        {
          path: '/notifications',
          name: 'notifications',
          props: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/Notification.vue')
        },
        {
          path: '/mytransaction',
          name: 'mytransaction',
          props: true,
          component: () => import(/* webpackChunkName: "demo" */ './views/MyRequest.vue')
        }
      ]

    }
  ]
})
