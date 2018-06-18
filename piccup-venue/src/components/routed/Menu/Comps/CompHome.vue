<script>
import CompList from '$routed/Menu/Comps/CompList'

import ItemModel from '@/global/models/item.js'
import CategoryModel from '@/global/models/category.js'
import ModifierListModel from '@/global/models/modifierList.js'

import bus from '@/global/eventBus.js'

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
  computed: {
    models () {
      return {
        items: ItemModel,
        categories: CategoryModel,
        modifier_lists: ModifierListModel,
      }
    },
  },
  methods: {
    onNewComp () {
      this.$store.commit('setEditComp', this.models[this.compType.id])
      bus.$emit('showCreateShell', {new: true})
    },
  },
}
</script>

<template lang="pug">
  .comp-home.row
    .comp-home-container.col.s12
      .click-me.btn.waves-effect.waves-dark.col.s12(
        @click='onNewComp()'
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

