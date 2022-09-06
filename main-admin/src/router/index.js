import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/Login'
import Home from "@/views/Home"
import store from "@/store"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },

  },
  {
    path: '/#',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'home',
    },

    children: [{
      path: 'charts',
      name: 'Charts',
      meta: {
        title: '统计',
        icon: 'area-chart',
      },

      component: () => import('@/views/Home/Charts.vue'),
    },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      icon: 'shop',
    },

    children: [
      {
        path: 'list',
        name: 'List',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
        },

        component: () => import('@/views/Products/List'),
      },
      {
        path: 'add',
        name: 'Add',
        meta: {
          title: '添加商品',
          icon: 'file-add',
        },

        component: () => import('@/views/Products/Add'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
let isAddRoutes = false;

// 登陆拦截
router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    let storeUser = store.state.user.user
    if (storeUser.appkey && storeUser.username && storeUser.role) {
      if (!isAddRoutes) {
        store.dispatch("menu/fetchMenuRoutes", routes).then(() => {
          next();
        });
        isAddRoutes = true;
      }
      return next();
    } else {
      return next('/');
    }
  }
  return next();
})

export default router


