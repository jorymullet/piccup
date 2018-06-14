<script>
export default {
  name: 'CreateItem',
  props: {
    item: {
      type: Object,
    },
  },
}
</script>

<template lang="pug">
  #create-item.form
    .input-field
      input#name(
        v-model='item.name'
      )
      label(
        for='name'
      ) Name
</template>

<style lang="sass" scoped>
  #create-item
    height: 100%
</style>
