<script>
export default {
  name: 'Navigation',
  props: {
    left_word: {
      type: String,
    },
    left_action: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  methods: {
    goBack () {
      console.log(this.left_action)
      console.log(this.left_word)
      //this.$router.back()
    },
  },
  mounted () {
    M.AutoInit()
  }
}
</script>

<template lang='pug'>
  nav
    .nav-wrapper
      .back(
        v-if='left_word === "$back"'
        @click='left_action ? $emit(left_action) : goBack()'
        )
        i.material-icons chevron_left
      .dead-center {{title}}
      //ul#top-bar.right.hide-on-med-and-down
        li Cats
        li Dawgs
        li Secret Rushin Planz
      //ul#slide-out.sidenav
        li Cats
        li Dawgs
        li Secret Nazi Plans
      //a.right.sidenav-trigger(
        href='#' 
        data-target='slide-out' 
        )
        i.material-icons menu
</template>

<style scoped lang='scss'>
  @import 'vars';
  nav {
    .nav-wrapper {
      #top-bar {
        li {
          margin-right: 20px;
        }
      }
      #slide-out {
        color: $secondary-color;
      }
    }
  }
</style>
