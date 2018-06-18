<script>
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
}
</script>

<template lang="pug">
  #current-home
    .order-holder
      .order.card(
        v-for='order in currentOrders'
      )
        .card-content
          .left-side
            .card-title \#{{order.order_num}}
            .order-actions
              .btn.waves-effect.waves-dark start
          .right-side
            .order-summary
              .order-detail(
                v-for='orderedItem in order.list_of_orders'
              ) {{orderedItem.variation.name}} {{orderedItem.item.name}}
</template>

<style lang="sass" scoped>
  #current-home
    .order-holder
      .card
        .card-content
          padding: 15px
          display: flex
          .left-side
            flex-grow: 1
            .card-title
            .order-actions
              $btn-height: 30px
              .btn
                padding: 0px 10px
                height: $btn-height
                line-height: $btn-height
          .right-side
            flex-grow: 8
            .order-summary
              font-size: .9em
              display: flex
              .order-detail:after
                content: ', '
              .order-detail:last-child:after
                content: ''
          
</style>
