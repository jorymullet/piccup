<script>
import CreateNav from '$routed/Menu/Create/CreateNav'
import CreateItem from '$routed/Menu/Create/Item/CreateItem'
import CreateCategory from '$routed/Menu/Create/Category/CreateCategory'
import CreateModifierList from '$routed/Menu/Create/ModifierList/CreateModifierList'
import bus from '@/global/eventBus.js'

export default {
  name: 'CreateShell',
  components: {
    'create-nav': CreateNav,
    'create-item': CreateItem,
    'create-category': CreateCategory,
    'create-modifier-list': CreateModifierList,
  },
  computed: {
    isNew () {
      return this.$store.state.isNew
    },
  },
  props: {
    compType: {
      type: Object,
    },
    menu: {
      type: Object,
    },
  },
}
</script>

<template lang="pug">
  #create-shell.row
    create-nav(
      @hideCreateShell='$emit("hideCreateShell")'
      :compType='compType'
      :isNew='isNew'
      )
    #create-comp-holder.col.s10.offset-s1
      create-item(
        v-if='compType.id==="items"'
        :isNew='isNew'
        :menu='menu'
        )
      create-category(
        v-if='compType.id==="categories"'
        :isNew='isNew'
        )
      create-modifier-list(
        v-if='compType.id==="modifier_lists"'
        :isNew='isNew'
        )
</template>

<style lang="sass" scoped>
  @import 'vars'
  #create-shell
    background-color: $background-color
    height: 100vh
    width: 100%
    z-index: $create-shell-index
    position: fixed
    top: 0
    #create-comp-holder
      margin-top: $nav-height
      height: calc(100% - #{$nav-height})
</style>
