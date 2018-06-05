<script>
import Loading from '@/components/common/Loading'

export default {
  name: 'Foundation',
  components: {
    loading: Loading,
  },
  mounted () {
    this.$router.push({name: 'VenuesList'})
  }
}
</script>

<template lang='pug'>
  #foundation
    loading
    router-view
</template>
