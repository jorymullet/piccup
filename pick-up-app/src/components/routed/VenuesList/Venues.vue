<script>
import Navigation from '@/components/common/Navigation'
import List from '@/components/routed/VenuesList/List'

export default {
  name: 'VenuesList',
  components: {
    navigation: Navigation,
    list: List,
  },
}
</script>

<template lang='pug'>
  #venues-list
    navigation
    list
</template>

<style lang='scss'>
  @import 'vars';
</style>