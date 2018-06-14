<script>
import CreateNav from '$routed/Menu/Create/CreateNav'
import CreateItem from '$routed/Menu/Create/CreateItem'

import ItemModel from '@/global/models/item.js'
import CategoryModel from '@/global/models/category.js'
import ModifierListModel from '@/global/models/modifierList.js'

export default {
  name: 'CreateShell',
  components: {
    'create-nav': CreateNav,
    'create-item': CreateItem,
  },
  props: {
    compType: {
      type: Object,
    },
    passedComp: {
      type: Object,
    },
    isNew: {
      type: Boolean,
    },
  },
  computed: {
    models () {
      return {
        items: ItemModel,
        categories: CategoryModel,
        modifier_lists: ModifierListModel,
      }
    },
    compToEdit () {
      return this.isNew ? this.models[this.compType.id] : this.passedComp
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
      create-item(:item='compToEdit')
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
