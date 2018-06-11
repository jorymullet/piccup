<script>
import { getOrder } from '@/global/helpers/cart.js'
import { toDollars, getOrdersTotal, getOrdersCount } from '@/global/helpers/currency.js'

export default {
  name: 'OrderTracker',
  methods: {
    toDollars,
    getOrdersTotal,
    getOrdersCount,
    goToCheckout () {
      this.$store.commit('flashLoading', () => {
        this.$router.push({name: "Checkout"})
      })
    },
  },
}
</script>

<template lang='pug'>
  #order-tracker.click-me(
    v-if='$store.state.orders.length'
    @click='goToCheckout()'
    )
    .info-container
      .amount {{toDollars(getOrdersTotal($store.state.orders))}}
      .items {{getOrdersCount($store.state.orders)}}
      .logo
        img(src='/static/img/logo/small_black.svg')
</template>

<style lang='sass'>
  @import 'vars'
  
  #order-tracker
    height: 40px
    width: 100%
    position: fixed
    bottom: 0
    box-shadow: 5px 5px 5px 5px lightgrey
    .info-container
      display: flex
      line-height: 40px
      color: black
      > div
        flex-grow: 1
        text-align: center
      .logo
        > img
          width: 50px
</style>