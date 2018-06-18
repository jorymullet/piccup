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
    shouldSave () {
      return !!this.item.name && !!this.item.variations.length
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
        this.sendSavability()
      }
    },
    deleteVariation (idx) {
      this.item.variations.splice(idx, 1)
      this.sendSavability()
    },
    sendSavability () {
      bus.$emit('savability', this.shouldSave)
    },
    toggleOption (type, option) {
      const key = option['.key']
      const index = this.item[type + '_ids'].indexOf(key)
      if(index === -1) this.item[type + '_ids'].push(key)
      else this.item[type + '_ids'].splice(index, 1)
    },
  },
  mounted () {
    this.sendSavability()
    this.$refs.compName.focus()
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
          ref='compName'
          @keyup='sendSavability()'
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
            i.material-icons(@click='deleteVariation(variationIdx)') delete
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
        .pu-header Categories
        .options-holder
          .option(v-for='category in menu.categories')
            .name {{category.name}}
            i.material-icons.right(
              @click='toggleOption("category", category)'
            ) {{item.category_ids.includes(category['.key']) ? 'check' : 'check_box_outline_blank'}}
        .pu-header Modifier Lists
        .options-holder
          .option(v-for='modifier_list in menu.modifier_lists')
            .name {{modifier_list.name}}
            i.material-icons.right(
              @click='toggleOption("modifier_list", modifier_list)'
            ) {{item.modifier_list_ids.includes(modifier_list['.key']) ? 'check' : 'check_box_outline_blank'}}
             
    delete-comp

</template>

<style lang="sass" scoped>
  @import '@/global/styles/form.sass'
  #create-item
    overflow: scroll
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
  
  .options-holder
    height: 140px
    box-shadow: 0 0 5px 0 inset grey
    overflow-y: scroll
    .option
      display: inline-block
      width: 100%
      padding: 10px 25px
      .name
        display: inline-block
      i
        float: right
  .options-holder:last-child
    margin-bottom: 25px
</style>
