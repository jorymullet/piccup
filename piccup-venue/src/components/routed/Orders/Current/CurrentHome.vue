<script>
import { db } from '@/main.js'
import bus from '@/global/eventBus.js'

export default {
  name: 'CurrentHome',
  props: {
    orders: {
      type: Array,
    },
  },
  computed: {
    currentOrders () {
      return this.orders.filter(order => order.status !== 'completed')
    },
  },
  methods: {
    summarizeOrder (ordersList) {
      return ordersList.map((orderedItem) => {
        return orderedItem.quantity + ' ' + orderedItem.variation.name + ' ' + orderedItem.item.name
      }).join(', ')
    },
    startOrder (order) {
      bus.$emit('updateOrder', {
        order: order, 
        updates: {
          status: 'started',
        },
      })
    },
    getCardStyle (order) {
      return {
        //'min-height': order.status === 'unstarted' ? '68px' : '250px',
        //'overflow-y': order.status === 'unstarted' ? 'hidden' : 'auto',
        'height': order.status === 'unstarted' ? '68px' : 'unset',

      }
    },
    getCardRevealStyle (order) {
      return {
        transform: order.status === 'unstarted' ? 'none' : 'translateY(-100%)',
        display: order.status === 'unstarted' ? 'none' : 'block',
        'overflow-y': order.status === 'unstarted' ? 'hidden' : 'auto',
      }
    },
  },
}
</script>

<template lang="pug">
  #current-home.col.s12
    .order-holder
      .order.card(
        v-for='order in currentOrders'
        :style='getCardStyle(order)'
      )
        .card-content
          .card-title \#{{order.order_num}}
          .order-summary(
            v-if='order.status === "unstarted"'
            ) {{summarizeOrder(order.list_of_orders)}}
          .order-actions(
            v-if='order.status === "unstarted"'
            )
            .btn.waves-effect.waves-dark.activator(
              @click='startOrder(order)'
              ) start
        .card-reveal(
          :style='getCardRevealStyle(order)'
          )
          span.card-title \#{{order.order_num}}
          .pu-header Ordered Items
          .ordered-items-holder
            .ordered-item(
              v-for='orderedItem in order.list_of_orders'
              ) {{orderedItem.quantity}} {{orderedItem.variation.name}} {{orderedItem.item.name}}
          .pu-header Ordered Items
          .ordered-items-holder
            .ordered-item(
              v-for='orderedItem in order.list_of_orders'
              ) {{orderedItem.quantity}} {{orderedItem.variation.name}} {{orderedItem.item.name}}
          .pu-header Ordered Items
          .ordered-items-holder
            .ordered-item(
              v-for='orderedItem in order.list_of_orders'
              ) {{orderedItem.quantity}} {{orderedItem.variation.name}} {{orderedItem.item.name}}



</template>

<style lang="sass" scoped>
  @import '@/global/styles/form.sass'
  #current-home
    .order-holder
      .card
        overflow-y: auto !important
        transition: all .5s
        display: block
        .card-content
          display: flex
          padding: 15px
          .card-title
            flex-grow: 1
            font-size: 1.3em
            line-height: 24px
          .order-summary
            flex-grow: 11
            font-size: .9em
            display: flex
            padding: 0 10px
          .order-actions
            $btn-height: 32px
            flex-grow: 1
            .btn
              height: $btn-height
              line-height: $btn-height
        .card-reveal
          height: unset
          .pu-header
            //margin-top: 2px
</style>
