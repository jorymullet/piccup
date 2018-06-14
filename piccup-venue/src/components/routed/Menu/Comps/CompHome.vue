<script>
import CompList from '$routed/Menu/Comps/CompList'

export default {
  name: 'CompHome',
  props: {
    compType: {
      type: Object,
    },
    menu: {
      type: Object,
    }
  },
  components: {
    'comp-list': CompList,
  },
}
</script>

<template lang="pug">
  .comp-home.row
    .comp-home-container.col.s12
      .click-me.btn.waves-effect.waves-dark.col.s12(
        @click='$emit("showCreateShell", {new: true})'
        )
        | create {{compType.short}}
      comp-list(:compType='compType', :comps='menu[compType.id]')
</template>

<style lang="sass" scoped>
  @import 'vars'
  .comp-home
    position: absolute
    width: 100%
    margin-bottom: 0
    .btn
      background-color: #fff
      color: grey
      text-transform: capitalize
</style>

