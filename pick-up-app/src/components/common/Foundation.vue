<script>
export default {
  name: 'Foundation',
  mounted () {
    this.$router.push({name: 'VenuesList'})
  }
}
</script>

<template lang='pug'>
  router-view
</template>
