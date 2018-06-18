import Vue from 'vue'
import Router from 'vue-router'

import Foundation from '$common/Foundation'
import MenuHome from '$routed/Menu/MenuHome'
import OrdersHome from '$routed/Orders/OrdersHome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Foundation',
      component: Foundation,
      children: [
        {
          path: 'menu',
          name: 'Menu',
          component: MenuHome,
        },
        {
          path: 'orders',
          name: 'Orders',
          component: OrdersHome,
        },
      ],
    },
  ],
})
