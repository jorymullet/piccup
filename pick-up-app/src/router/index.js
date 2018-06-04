import Vue from 'vue'
import Router from 'vue-router'
import VenuesList from '@/components/routed/VenuesList/Venues'
import Foundation from '@/components/common/Foundation'

import Venue from '@/components/routed/Venue/Venue'

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
          path: '/venues',
          name: 'VenuesList',
          component: VenuesList,
        },
        {
          path: '/venues/:venueId',
          name: 'Venue',
          component: Venue,
        },
      ],
    },
  ],
})
