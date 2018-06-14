<script>
import MenuNav from '$routed/Menu/MenuNav'
import CompHome from '$routed/Menu/Comps/CompHome'
import CreateShell from '$routed/Menu/Create/CreateShell'
import { db } from '@/main.js'

export default {
  name: 'MenuHome',
  components: {
    'menu-nav': MenuNav,
    'comp-home': CompHome,
    'create-shell': CreateShell,
  },
  data () {
    return {
      compTypes: [
        {
          ordinal: 0,
          id: 'items',
          short: 'item',
          long: 'items',
        },
        {
          ordinal: 1,
          id: 'modifier_lists',
          short: 'modifier',
          long: 'modifiers',
        },
        {
          ordinal: 2,
          id: 'categories',
          short: 'category',
          long: 'categories',
        },
      ],
      chosenCompType: {},
      transitionName: '',
      items: [],
      modifiers: [],
      modifier_lists: [],
      categories: [],
      venues: [],
      seeCreateShell: false,
      isNew: false,
    }
  },
  firestore () {
    return {
      venues: db.collection('venues'),
      items: db.collection('venues').doc('zen-cafe').collection('items').orderBy('id'),
      modifiers: db.collection('venues').doc('zen-cafe').collection('modifiers').orderBy('id'),
      modifier_lists: db.collection('venues').doc('zen-cafe').collection('modifier_lists').orderBy('id'),
      categories: db.collection('venues').doc('zen-cafe').collection('categories').orderBy('id'),
    }
  },
  computed: {
    menu () {
      return {
        items: this.items, modifiers: this.modifiers, modifier_lists: this.modifier_lists, categories: this.categories,
      }
    },
  },
  methods: {
    onTabClick (id) {
      const newCompType = this.compTypes.find(compType => compType.id === id)
      this.transitionName = newCompType.ordinal > this.chosenCompType.ordinal ? 'comp-slide-left' : 'comp-slide-right'
      this.chosenCompType = newCompType
    },
    showCreateShell (options) {
      this.seeCreateShell = true
      this.isNew = options.new
      M.updateTextFields()
    },
  },
  created () {
    this.chosenCompType = this.compTypes[0]
  },
}
</script>

<template lang="pug">
  #menu-home
    menu-nav(@onTabClick='onTabClick')
    transition(name='shell-slide')
      create-shell(
        v-if='seeCreateShell'
        :compType='chosenCompType'
        :isNew='isNew'
        @hideCreateShell='seeCreateShell=false'
        )
    transition-group#comp-home-holder(
      tag='div'
      :name='transitionName'
      )
      comp-home(
        v-for='compType in compTypes' 
        v-if='compType.id === chosenCompType.id'
        :key='compType.id' 
        :compType='compType'
        :menu='menu'
        @showCreateShell='showCreateShell'
        )
</template>

<style lang="sass" scoped>
  @import 'vars'

  .shell-slide-enter-active, .shell-slide-leave-active
    transition: transform .25s
  
  .shell-slide-enter, .shell-slide-leave-to
    transform: translateX(100%)

  .comp-slide-left-enter-active, .comp-slide-right-enter-active, .comp-slide-left-leave-active, .comp-slide-right-leave-active,
    transition: transform .25s

  .comp-slide-left-enter, .comp-slide-right-leave-to
    transform: translateX(100%)

  .comp-slide-right-enter, .comp-slide-left-leave-to
    transform: translateX(-100%)

  #menu-home
    height: 100%
    background-color: $background-color
    #comp-home-holder
      position: relative
      top: $menu-nav-height
      width: 100%
      background-color: $background-color
</style>


