<script>
export default {
  name: 'CreateNav',
  props: {
    isNew: {
      type: Boolean,
    },
    compType: {
      type: Object,
    },
  },
}
</script>

<template lang="pug">
  #create-nav
    .nav-holder
      .back-holder.click-me(@click='$emit("hideCreateShell")')
        i.dead-center.material-icons arrow_back
      .title.dead-center  {{true ? 'create' : 'edit'}} {{compType.long}}
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

        
</style>
