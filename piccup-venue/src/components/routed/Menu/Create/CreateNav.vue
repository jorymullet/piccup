<script>
import bus from '@/global/eventBus.js'

export default {
  name: 'CreateNav',
  props: {
    compType: {
      type: Object,
    },
  },
  data () {
    return {
      shouldSave: false,
    }
  },
  computed: {
    isNew () {
      return this.$store.state.isNew
    },
  },
  methods: {
    onSave () {
      if (this.shouldSave) {
        const saveType = this.isNew ? 'create' : 'update'
        bus.$emit('crudComp', saveType)
      }
    },
  },
  created () {
    bus.$on('savability', (shouldSave) => {
      this.shouldSave = shouldSave
    })
    bus.$on('saveComp', this.onSave)
  }
}
</script>

<template lang="pug">
  #create-nav
    .nav-holder
      .back-holder.click-me(@click='$emit("hideCreateShell")')
        i.dead-center.material-icons arrow_back
      .title.dead-center {{isNew ? 'create' : 'edit'}} {{compType.short}}
      .save-button(
        @click='onSave()'
        :class='shouldSave ? "save" : "dont-save"'
        ) SAVE
</template>

<style lang="sass" scoped>
  @import 'vars'
  @import 'helpers'
  #create-nav
    height: $nav-height
    background-color: white
    box-shadow: 0 0 5px 0 lightgrey
    position: fixed
    width: 100%
    z-index: $create-nav-index
    .nav-holder
      height: 100%
      display: flex
      position: relative
      .back-holder
        height: 100%
        position: relative
        width: $nav-height
      .title
        text-transform: capitalize
      .save-button
        height: $nav-height
        line-height: $nav-height
        padding: 0 10px
        position: absolute
        right: 0
        color: white
        font-weight: 600
        transition: all .25s
      .save
        background-color: $primary-color
      .dont-save
        background-color: lightgrey


        
</style>
