<script>
import bus from '@/global/eventBus.js'

export default {
  name: 'DeleteComp',
  computed: {
    bus () {
      return bus
    },
    compTypeInfo () {
      return this.$store.state.compTypeInfo
    },
    isNew () {
      return this.$store.state.isNew
    },
  },
}
</script>

<template lang="pug">
  .delete-comp(
    @click='bus.$emit("deleteComp")'
    v-if='!isNew'
  ) Delete {{compTypeInfo.short}}
</template>

<style lang="sass" scoped>
  @import 'vars'
  .delete-comp
    text-transform: capitalize
    text-align: center
    font-weight: 600
    color: $red
</style>
