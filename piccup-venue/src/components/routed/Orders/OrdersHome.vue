<script>
import OrdersNav from '$routed/Orders/OrdersNav'
import CurrentHome from '$routed/Orders/Current/CurrentHome'
import PastHome from '$routed/Orders/Past/PastHome'
import { db } from '@/main.js'
import bus from '@/global/eventBus.js'

export default {
  name: 'OrdersHome',
  components: {
    'orders-nav': OrdersNav,
    'current-home': CurrentHome,
    'past-home': PastHome,
  },
  data () {
    return {
      orders: [],
      transitionName: 'orders-slide-left',
    }
  },
  computed: {
    ordersType () {
      return this.$store.state.ordersType
    },
  },
  methods: {
    prepareFirebase () {
      db.collection('orders').where('venue_id', '==', 'zen-cafe')
        .onSnapshot((querySnapshot) => {
          this.orders = []
          querySnapshot.forEach((doc) => {
            let data = doc.data()
            data['.key'] = doc.id
            this.orders.push(data)
          })
          this.$store.commit('hideLoading')
        })
    },
    updateOrder (order, updates) {
      const key = order['.key']
      delete order['.key']
      db.collection('orders').doc(key).update(updates)
    }
  },
  created () {
    this.$store.commit('showLoading')
    this.prepareFirebase()
    bus.$on('updateOrder', (updateObj) => {
      this.updateOrder(updateObj.order, updateObj.updates)
    })
  },
}
</script>

<template lang="pug">
  #orders-home.row
    orders-nav
    transition-group.order-group-holder.row(
      tag='div'
      :name='transitionName'
    )
      current-home(
        key='current'
        v-if='ordersType.id === "current"'
        :orders='orders'
      )
      past-home(
        key='past'
        v-if='ordersType.id === "past"'
        :orders='orders'
      )
</template>

<style lang="sass" scoped>
@import 'vars'
#orders-home
  .order-group-holder
    position: relative
    top: $nav-height
    height: 200px
    padding: 0
    > *
      position: absolute
      width: 100%

.orders-slide-left-enter-active, .orders-slide-right-enter-active, .orders-slide-left-leave-active, .orders-slide-right-leave-active,
  transition: transform .25s

.orders-slide-left-enter, .orders-slide-right-leave-to
  transform: translateX(100%)

.orders-slide-right-enter, .orders-slide-left-leave-to
  transform: translateX(-100%)

</style>
