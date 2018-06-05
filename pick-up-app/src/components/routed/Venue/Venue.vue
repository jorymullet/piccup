<script>
import Navigation from '@/components/common/Navigation'
import VenueInfo from '@/components/common/VenueInfo'
import Menu from '@/components/routed/Venue/Menu'
import ItemView from '@/components/routed/Venue/ItemView'

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
  },
  computed: {
    venue () {
      return this.$store.state.venue
    },
  }
}
</script>

<template lang='pug'>
  #venue
    navigation(
      :title='venue.name'
      left_word='$back'
      left_action='none'
      )
    venue-info
    venue-menu(@seeItemView='seeItemView = true')
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