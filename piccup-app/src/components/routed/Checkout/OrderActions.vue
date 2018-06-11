<script>
import { db } from '@/main.js'
import { clearOrders } from '@/global/helpers/cart.js'
import { toDollars, getOrdersTotal } from '@/global/helpers/currency.js'

export default {
  name: 'OrderActions',
  computed: {
    venue () {
      return this.$store.state.venue
    },
    total () {
      return getOrdersTotal(this.$store.state.orders)
    },
  },
  methods: {
    getOrdersTotal,
    toDollars,
    backToVenue () {
      this.$store.commit('flashLoading', () => {
        this.$router.push({name: "Venue", params: {venueId: this.venue.id}})
      })
    },
    placeOrder () {
      const order = {
        list_of_orders: this.$store.state.orders,
        status: 'unstarted',
        venue_id: this.venue.id,
        created_at: Date.now(),
      }
      db.collection('orders').doc().set(order)
        .then(() => {
          clearOrders()
          alert('Order placed!')
        })
        .catch(() => {
          alert('Order failed.')
        })
    },
  },
}
</script>

<template lang="pug">
  #order-actions.row
    .content-holder.col.s12.m10.offset-m1.l8.offset-l2
      .info-holder
        .total(v-if='total') Total: 
          transition(
            name='smooth'
          )
            span {{toDollars(total)}}
      .actions-holder
        .btn.waves-effect.action(@click='backToVenue()') {{total ? 'BUY MORE' : 'BACK TO VENUE'}}
        .btn-large.waves-effect.waves-light.action.submit(
          @click='placeOrder()'
          v-if='total'
          ) PLACE ORDER
</template>

<style lang="sass" scoped>
  .smooth-enter-active, .smooth-leave-active
    transition: opacity 2s

  .smooth-enter, .smooth-leave-to
    opacity: 0

  #order-actions
    .content-holder
      > div
        margin-bottom: 20px
      .info-holder
        .total
          font-size: 2em
      .actions-holder
        text-align: center
        .action
          width: 100%
          margin-bottom: 15px
        .submit
          background-color: #222
</style>


