<script>
import FootNav from '$common/FootNav'
export default {
  name: 'Foundation',
  components: {
    'foot-nav': FootNav,
  },
  mounted () {
    this.$router.push({name: 'Menu'})
  },
}
</script>

<template lang="pug">
  #foundation
    foot-nav
    router-view
</template>

<style lang="sass" scoped>
  #foundation
    height: 100%
</style>

