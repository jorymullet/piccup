<script>
export default {
  name: 'Loading',
  computed: {
    seeLoading () {
      return this.$store.state.seeLoading
    }
  }
}
</script>

<template lang='pug'>
  transition(name='fade')
    #loading(v-if='seeLoading')
      img.dead-center(src='/static/img/loading.svg')
</template>

<style scoped lang='scss'>
  @import 'vars';
  @import 'helpers';
  #loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparentize($color: $background-color, $amount: .3);
    z-index: 990;
    img {
      opacity: 1;
      top: 45%;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>