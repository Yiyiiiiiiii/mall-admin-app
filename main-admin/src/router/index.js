import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/Login'
import Home from "@/views/Home"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/#',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [{
      path: 'charts',
      name: 'Charts',
      meta: {
        title: '统计',
      },
      component: () => import('@/views/Home/Charts.vue'),
    },
    {
      path: 'product/list',
      name: 'List',
      meta: {
        title: '商品列表',
      },
      component: () => import('@/views/Products/List'),
    },
    {
      path: 'product/add',
      name: 'Add',
      meta: {
        title: '添加商品',
      },
      component: () => import('@/views/Products/Add'),
    },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
