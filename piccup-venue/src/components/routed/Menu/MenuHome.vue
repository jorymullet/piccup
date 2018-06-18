<script>
import MenuNav from '$routed/Menu/MenuNav'
import CompHome from '$routed/Menu/Comps/CompHome'
import CreateShell from '$routed/Menu/Create/CreateShell'
import { db } from '@/main.js'
import bus from '@/global/eventBus.js'

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
      items: db.collection('venues').doc('zen-cafe').collection('items'),
      modifiers: db.collection('venues').doc('zen-cafe').collection('modifiers'),
      modifier_lists: db.collection('venues').doc('zen-cafe').collection('modifier_lists'),
      categories: db.collection('venues').doc('zen-cafe').collection('categories'),
    }
  },
  computed: {
    menu () {
      return {
        items: this.items, modifiers: this.modifiers, modifier_lists: this.modifier_lists, categories: this.categories,
      }
    },
    editComp () {
      return this.$store.state.editComp
    },
    compTypeInfo () {
      return this.$store.state.compTypeInfo
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
      this.$store.commit('setIsNew', options.new)
      M.updateTextFields()
    },
    saveComp (compType) {
      this.$firestore[this.compTypeInfo.id].add(this.editComp)
      this.seeCreateShell = false
    },
    deleteComp () {
      this.$firestore[this.compTypeInfo.id].doc(this.editComp['.key']).delete()
      this.seeCreateShell = false
    },
  },
  created () {
    this.chosenCompType = this.compTypes[0]
    bus.$on('saveComp', (compType) => {
      this.saveComp(compType)
    })
    bus.$on('showCreateShell', this.showCreateShell)
    bus.$on('deleteComp', this.deleteComp)
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
        @hideCreateShell='seeCreateShell=false'
        :menu='menu'
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