<script>
import FootNav from '$common/FootNav'
import Loading from '$common/Loading'
export default {
  name: 'Foundation',
  components: {
    'foot-nav': FootNav,
    'loading': Loading,
  },
  mounted () {
    this.$store.commit('showLoading')
    this.$router.push({name: 'Menu'})
  },
}
</script>

<template lang="pug">
  #foundation
    loading
    foot-nav
    router-view
</template>

<style lang="sass" scoped>
  #foundation
    min-height: 100%
</style>

