import Vue from 'vue'
import Router from 'vue-router'

import Foundation from '@/components/common/Foundation'
import VenuesList from '@/components/routed/VenuesList/Venues'
import Venue from '@/components/routed/Venue/Venue'
import Checkout from '@/components/routed/Checkout/Checkout'

import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  beforeEach: (to, from, next) => {
    console.log('wow')
    next()
  },
  routes: [
    {
      path: '/',
      name: 'Foundation',
      component: Foundation,
      children: [
        {
          path: '/venues',
          name: 'VenuesList',
          component: VenuesList,
        },
        {
          path: '/venues/:venueId',
          name: 'Venue',
          component: Venue,
        },
        {
          path: '/venues/:venueId/checkout',
          name: 'Checkout',
          component: Checkout,
        },
      ],
    },
  ],
})

export default router
