<script>
import Navigation from '@/components/common/Navigation'
import List from '@/components/routed/VenuesList/List'

export default {
  name: 'VenuesList',
  components: {
    navigation: Navigation,
    list: List,
  },
  mounted () {
    this.$store.commit('showLoading')
  }
}
</script>

<template lang='pug'>
  #venues-list
    navigation(title='Pick a venue')
    list
</template>

<style scoped lang='scss'>
  @import 'vars';
</style>