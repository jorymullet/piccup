<script>
import Loading from '@/components/common/Loading'

export default {
  name: 'Foundation',
  components: {
    loading: Loading,
  },
  mounted () {
    //allows for orders to be stored in localStorage while also automatically updating in the Store
    this.$store.commit('updateOrders')
    document.addEventListener('storageChange', () => {
      this.$store.commit('updateOrders')
    }, false)
    this.$router.push({name: 'VenuesList'})
  }
}
</script>

<template lang='pug'>
  #foundation
    loading
    router-view
</template>
