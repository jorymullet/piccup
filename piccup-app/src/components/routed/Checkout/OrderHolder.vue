<script>
import { changeQuantity, deleteOrder, getOrder } from '@/global/helpers/cart.js'
import { toDollars, getOrdersTotal } from '@/global/helpers/currency.js'

export default {
  name: 'OrderHolder',
  computed: {
    orders () {
      return this.$store.state.orders
    },
  },
  methods: {
    changeQuantity,
    deleteOrder,
    toDollars,
    getOrdersTotal,
  },
}
</script>

<template lang='pug'>
  #order.row
    #order-holder.col.s12.m10.offset-m1.l8.offset-l2
      //transition-group(
          name='order-fade'
          tag='div'
          )
      .no-orders(
        v-if='!orders.length'
      ) No Items
      .order.card(
        v-for='(order, orderIdx) in orders' 
        :key='Math.random()'
        v-else
        )
        .card-content
          .card-title {{order.item.name}} 
            span {{toDollars(getOrdersTotal([order]))}}
          span.modifier(v-for='(modifier, modifierIdx) in order.modifiers') 
            |{{modifier.name}}{{modifierIdx + 1 === order.modifiers.length ? '' : ','}}
        .card-action
          .action-holder
            .change-quantity 
              .material-icons(
                :style='{opacity: order.quantity === 1 ? .2 : 1}'
                :class='order.quantity === 1 ? "dont-click-me" : "click-me"'
                @click='order.quantity !== 1 && changeQuantity(-1, orderIdx)'
                ) remove
              .quantity {{order.quantity}}
              .material-icons.click-me(
                @click='changeQuantity(1, orderIdx)'
                ) add
          .action-holder
            .delete
              .material-icons.click-me(
                @click='deleteOrder(orderIdx)'
              ) delete
</template>

<style scoped lang='sass'>
  @import 'vars'

  .order-fade-enter-active, .order-fade-leave-active
    //transition: all .5s

  .order-fade-enter, .order-fade-leave-to
    //transform: translateX(100%)
    //opacity: 0

  .card > .card-content
    padding: 6px 24px

  #order
    #order-holder
      .no-orders
        text-transform: uppercase
        text-align: center
        font-size: 2em
        color: grey
      .order
        display: inline-block
        width: 100%
        .card-content
          .card-title
            > span
              font-size: .6em
              color: grey
              float: right
        .card-action
          display: flex
          .action-holder
            flex-grow: 1
            .change-quantity
              display: flex
              border-right: thin grey solid
              > div
                flex-grow: 1
            .delete
              width: 100%
              text-align: center
</style>