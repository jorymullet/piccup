<template lang='pug'>
  #app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='sass'>
html
  height: 100%
  overflow-x: hidden

body
  margin: 0
  height: 100%
  overflow-x: hidden
  overflow-y: scroll

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button 
    -webkit-appearance: none
    margin: 0
</style>
