<script>
let tabs;

export default {
  name: 'MenuNav',
  data () {
    return {
      menuLinks: [
        {
          id: 'items',
          icon: 'menu',
          name: 'items',
          short: 'item',
        },
        {
          id: 'modifier_lists',
          icon: 'menu',
          name: 'modifiers',
          short: 'modifier',
        },
        {
          id: 'categories',
          icon: 'menu',
          name: 'categories',
          short: 'category',
        },
      ],
      activeLink: 'items',
    }
  },
  methods: {
    onMenuTabClick (link) {
      this.activeLink = link.id
      this.$emit("onTabClick", link.id)
      this.$store.commit('setCompTypeInfo', link)
    },
  },
  mounted () {
    M.AutoInit()
    this.onMenuTabClick(this.menuLinks[0])
  },
}
</script>

<template lang="pug">
  #menu-nav.row
      .col.s12
        ul#menu-tabs.tabs
          li.tab.col(
            :class='"s" + (12 / menuLinks.length)'
            v-for='link in menuLinks'
            @click='onMenuTabClick(link)'
            )
            a.click-me(
              :class='activeLink === link.id ? "active" : "inactive"'
              )
              span {{link.name}}
</template>

<style lang="sass" scoped>
@import 'vars'
@import 'helpers'
#menu-nav
  position: fixed
  width: 100%
  z-index: $menu-nav-index
  height: $menu-nav-height
  .col
    padding: 0
    #menu-tabs
      background-color: lighten($background-color, 10%)
      box-shadow: 0px 0px 5px 0px lightgrey
      li
        a
          color: black
          text-transform: capitalize
          font-size: .8em
        .active
          opacity: 1
        .inactive
          opacity: .7
      li.indicator
        background-color: black

</style>


