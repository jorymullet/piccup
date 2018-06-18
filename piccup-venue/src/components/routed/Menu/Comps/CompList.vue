<script>
import bus from '@/global/eventBus.js'

export default {
  name: 'CompList',
  props: {
    compType: {
      type: Object,
    },
    comps: {
      type: Array,
    },
  },
  methods: {
    onCompClick (comp) {
      this.$store.commit('setEditComp', comp)
      bus.$emit('showCreateShell', {new: false})
    },
  },
}
</script>

<template lang="pug">
  #comp-list.col.s12
    .no-comps(
      v-if='!comps.length'
    ) 
      .title No {{compType.long}} in library
      .sub-title Start by clicking 'create {{compType.long}}' above
    .comp-holder.col.s12(v-else)
      .comp.btn.waves-effect(
        v-for='comp in comps'
        @click='onCompClick(comp)'
      )
        .comp-title {{comp.name}}
          i.material-icons.right arrow_forward
  
</template>

<style lang="sass" scoped>
  #comp-list
    padding: 0
    .no-comps
      text-align: center
      color: grey
      margin-top: 200px
      .title
        font-size: 1.5em
      .sub-title
        font-size: .9em
    .comp-holder
      margin-top: 45px
      max-height: calc(100vh - 200px)
      overflow: scroll
      .comp
        width: 100%
        text-align: left
        background-color: transparent
        color: black
        box-shadow: none
        border-bottom: thin lightgrey solid
        height: 45px
        line-height: 45px
        text-transform: capitalize
</style>
