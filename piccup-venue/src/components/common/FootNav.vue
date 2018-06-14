<script>
let tabs;
export default {
  data () {
    return {
      navLinks: [
        {
          id: 'menu',
          icon: 'web',
        },
      ],
      activeLink: 'menu',
    }
  },
  name: 'FootNav',
  mounted () {
    const el = document.getElementById('#nav-tabs')
    const options = {}
    tabs = M.Tabs.init(el, options);
  },
}
</script>

<template lang="pug">
  #foot-nav.row
    .col.s12
      ul#nav-tabs.tabs
        li.tab.col(
          :class='"s" + (12 / navLinks.length)'
          v-for='link in navLinks'
          @click='activeLink=link.id'
          )
          a.click-me(
            :class='activeLink === link.id ? "active" : "inactive"'
            )
            i.material-icons {{link.icon}}
</template>

<style lang="sass" scoped>
  @import 'helpers'
  @import 'vars'
  #foot-nav
    width: 100%
    position: fixed
    bottom: 0
    margin-bottom: 0
    box-shadow: 5px 5px 5px 5px lightgrey
    height: 35px
    z-index: $foot-nav-index
    .col
      padding: 0
      .tabs
        .tab
          a.inactive
            opacity: .5
</style>
