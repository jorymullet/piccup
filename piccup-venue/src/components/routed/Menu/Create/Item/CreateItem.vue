<script>
import DollarInput from '$common/DollarInput'
import DeleteComp from '$routed/Menu/Comps/DeleteComp'
import bus from '@/global/eventBus.js'

export default {
  name: 'CreateItem',
  props: {
    isNew: {
      type: Boolean,
    },
    menu: {
      type: Object,
    },
  },
  components: {
    'dollar-input': DollarInput,
    'delete-comp': DeleteComp,
  },
  data () {
    return {
      newVariation: {
        name: '',
        amount: '',
      },
    }
  },
  computed: {
    item () {
      return this.$store.state.editComp
    },
  },
  methods: {
    setVariationAmount (amount) {
      this.newVariation.amount = amount
    },
    addVariation () {
      const nv = this.newVariation
      if(nv.name && nv.amount) {
        this.item.variations.push({
          name: nv.name,
          amount: nv.amount,
        })
        this.newVariation.name = ''
        this.$refs.newName.focus()
        bus.$emit('resetDollarInput')
      }
    },
  },
}
</script>

<template lang="pug">
  #create-item.form
    .comp-info.col.s10.offset-s1
      .comp-name {{item.name || 'New Item'}}
    .pu-form
      .input-field
        input.pu-input(
          v-model='item.name'
          placeholder='Name'
        )
      .pu-header Sizes
      .variations-holder
        .variation(v-for='(variation, variationIdx) in item.variations')
          .variation-inputs.input-field
            input.pu-input.no-focus(
              placeholder='Name'
              v-model='variation.name'
              @keypress.enter='addVariation()'
              )
            dollar-input(
              :amount='variation.amount'
              :new='false'
              @currentAmount='setVariationAmount'
            )
            i.material-icons(@click='item.variations.splice(variationIdx, 1)') delete
        .variation
          .variation-inputs.input-field
            input.pu-input.no-focus(
              placeholder='Name'
              v-model='newVariation.name'
              ref='newName'
              )
            dollar-input(
              :amount='newVariation.amount'
              @currentAmount='setVariationAmount'
              @submit='addVariation()'
              :new='true'
            )
            i.material-icons(@click='addVariation()') add
      .input-field
             
    delete-comp

</template>

<style lang="sass" scoped>
  @import '@/global/styles/form.sass'
  #create-item
    height: 100%
    .pu-form
      .variations-holder
        .variation
          .variation-inputs
            margin: 0
            .pu-input, .dollar-input
              width: calc(50% - 12px)
              flex-grow: 4
              margin-bottom: 0
            i
              position: relative
              top: 7px
</style>
