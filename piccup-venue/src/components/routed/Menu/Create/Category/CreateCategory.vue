<script>
import bus from '@/global/eventBus.js'
import DeleteComp from '$routed/Menu/Comps/DeleteComp'

export default {
  name: 'CreateCategory',
  components: {
    'delete-comp': DeleteComp,
  },
  props: {
    isNew: {
      type: Boolean,
    }
  }, 
  computed: {
    category () {
      return this.$store.state.editComp
    },
    shouldSave () {
      return !!this.category.name
    },
    bus () {
      return bus
    },
  },
  methods: {
    onKeyup () {
      bus.$emit('savability', this.shouldSave)
    },
  },
  mounted () {
    this.onKeyup()
  },
}
</script>

<template lang="pug">
  #create-category.form
    .comp-info.col.s10.offset-s1
      .comp-name {{category.name || 'New Category'}}
    .pu-form
      .input-field
        input.pu-input(
          v-model='category.name'
          placeholder='Name'
          @keyup='onKeyup()'
          @keypress.enter='shouldSave && bus.$emit("saveComp")'
        )
    delete-comp

</template>

<style lang="sass" scoped>
  @import '@/global/styles/form.sass'
  #create-category
    height: 100%
</style>
