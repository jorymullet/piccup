<script>

import Navigation from '@/components/common/Navigation'
import OrderTracker from '@/components/common/OrderTracker'
import VenueInfo from '@/components/common/VenueInfo'
import ItemView from '@/components/routed/Venue/ItemView'
import Menu from '@/components/routed/Venue/Menu'

import { db } from '@/main.js'

export default {
  name: 'VenuesList',
  data () {
    return {
      seeItemView: false,
    }
  },
  components: {
    navigation: Navigation,
    'venue-info': VenueInfo,
    'venue-menu': Menu, // vue doesn't like it when I just use menu
    'item-view': ItemView,
    'order-tracker': OrderTracker,
  },
  computed: {
    venue () {
      return this.$store.state.venue
    },
  },
  mounted () {
    this.$store.commit('setVenue', this.$route.params.venueId)
  },
}
</script>

<template lang='pug'>
  #venue
    navigation(
      :title='venue.name'
      left_word='$back'
      )
    venue-info
    venue-menu(@seeItemView='seeItemView = true')
    order-tracker
    transition(name='slide-in')
      item-view(
        v-if='seeItemView'
        @hideItemView='seeItemView = false'
        )
</template>

<style scoped lang='scss'>
  .slide-in-enter-active, .slide-in-leave-active {
    transition: all .3s ease;
  }
  .slide-in-enter {
    transform: translateX(100%);
  }
  .slide-in-leave-to {
    transform: translateX(-100%);
  }
  #item-view {
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100vh;
    background-color: white;
  }
</style>