<script>
import Navigation from '@/components/common/Navigation'
import VenueInfo from '@/components/common/VenueInfo'
import OrderActions from '@/components/routed/Checkout/OrderActions'
import OrderHolder from '@/components/routed/Checkout/OrderHolder'

import { db } from '@/main.js'
import { getOrder } from '@/global/helpers/cart.js'

export default {
  name: 'Checkout',
  components: {
    navigation: Navigation,
    'venue-info': VenueInfo,
    'order-holder': OrderHolder,
    'order-actions': OrderActions,
  },
  computed: {
    orders () {
      return getOrder()
    },
    venue () {
      return this.$store.state.venue
    }
  },
}
</script>

<template lang='pug'>
  #checkout
    navigation(
      :title='venue.name'
      left_word='$back'
      )
    venue-info
    order-holder
    order-actions
</template>

<style scoped lang='scss'>
</style>