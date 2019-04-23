import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Main',
      component: () => import('./components/pages/Main.vue'),
      children: [{
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: () => import('./components/pages/CategoryList.vue')
        },
        {
          path: '/cart',
          name: 'Cart',
          component: () => import('./components/pages/Cart.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./components/pages/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/pages/Login.vue')
    },
    {
      path: '/goods',
      name: 'Goods',
      component: () => import('./components/pages/Goods.vue')
    }
  ]
})