<script>
export default {
  name: 'Navigation',
  props: {
    title: {
      type: String,
    },
  },
}
</script>

<template lang='pug'>
  nav
    .nav-wrapper
      router-link(:to='{name: "VenuesList"}').logo Wow
      .dead-center {{title}}
      ul.right.hide-on-med-and-down
        li Cats
        li Dawgs
        li Secret Rushin Planz
</template>

<style scoped lang='scss'>
  @import 'vars';
  nav {
    .nav-wrapper {
      ul {
        li {
          margin-right: 20px;
        }
      }
    }
  }
</style>
