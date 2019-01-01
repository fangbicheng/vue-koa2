import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/register',
      name: 'Register',
      component: () => import('./components/pages/Register.vue')
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('./components/pages/Login.vue')
    }, {
      path: '/goods',
      name: 'Goods',
      component: () => import('./components/pages/Goods.vue')
    }, {
      path: '/categoryList',
      name: 'CategoryList',
      component: () => import('./components/pages/CategoryList.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})