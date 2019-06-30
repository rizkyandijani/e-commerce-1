import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import productPage from './views/productPage'
import detailProduct from './components/detailProduct'
import addProduct from './views/addProduct'
import cartPage from './views/cartPage'
import editPage from './views/editPage'
import userPage from './views/userPage'
import detailTransaction from './components/detailTransaction'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path : '/productPage',
      name : 'productPage',
      component : productPage,
      children : [
        {path : 'detail/:productId', component : detailProduct}
      ]
    },
    {
      path : '/addProduct',
      name : 'addProductPage',
      component : addProduct
    },
    {
      path : '/cartPage',
      name : 'cartPage',
      component : cartPage
    },
    {
      path : '/editPage/:id',
      name : 'editPage',
      component : editPage
    },
    {
      path : '/userPage/:userId',
      name : userPage,
      component : userPage,
      children : [
        {path : 'detailTrans/:cartId', component : detailTransaction}
      ]
    }
  ]
})
