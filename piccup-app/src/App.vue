<template lang='pug'>
  #app
    transition(name='page' mode='out-in')
      router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='sass'>
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased

.card, .collapsible
  box-shadow: none

.page-enter-active, .page-leave-active
  transition: opacity 1s, transform 1s

.page-enter, .page-leave-to
  opacity: 0
  transform: translateX(-30%)

</style>
