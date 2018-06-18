<script>
export default {
  name: 'OrdersNav',
  data () {
    return {
      ordersTypes: [
        {
          id: 'current',
          name: 'current orders',
        },
        {
          id: 'past',
          name: 'past orders',
        },
      ],
      activeLink: 'current',
    }
  },
  methods: {
    onOrdersTabClick (type) {
      this.$store.commit('setOrdersType', type)
    },
  },
  mounted () {
    M.AutoInit()
    this.onOrdersTabClick(this.ordersTypes[0])
  },
}
</script>

<template lang="pug">
  #orders-nav.top-nav.row
      .col.s12
        ul#orders-tabs.top-tabs.tabs
          li.tab.col(
            :class='"s" + (12 / ordersTypes.length)'
            v-for='type in ordersTypes'
            @click='onOrdersTabClick(type)'
            )
            a.click-me(
              :class='activeLink === type.id ? "active" : "inactive"'
              )
              span {{type.name}}
</template>

<style lang="sass" scoped>
  @import 'vars'
  @import '@/global/styles/nav.sass'
</style>
