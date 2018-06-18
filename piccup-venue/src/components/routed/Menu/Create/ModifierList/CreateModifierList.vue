<script>
import bus from '@/global/eventBus.js'
import DollarInput from '$common/DollarInput'
import DeleteComp from '$routed/Menu/Comps/DeleteComp'

export default {
  name: 'CreateModifierList',
  components: {
    'delete-comp': DeleteComp,
    'dollar-input': DollarInput,
  },
  data () {
    return {
      newModifier: {
        name: '',
        amount: '',
      },
    }
  },
  computed: {
    modifierList () {
      return this.$store.state.editComp
    },
    bus () {
      return bus
    },
    shouldSave () {
      return !!this.modifierList.name && !!this.modifierList.modifiers.length
    },
  },
  methods: {
    setModifierAmount (amount) {
      this.newModifier.amount = amount
    },
    addModifier () {
      const nm = this.newModifier
      if(nm.name && nm.amount) {
        this.modifierList.modifiers.push({
          name: nm.name,
          amount: nm.amount,
        })
        this.newModifier.name = ''
        this.$refs.newName.focus()
        bus.$emit('resetDollarInput')
      }
      this.sendSavability()
    },
    onSelectMethodClick (e) {
      this.modifierList.select_one = this.$refs.selectMethodInput.checked
    },
    sendSavability () {
      bus.$emit('savability', this.shouldSave)
    },
  },
  mounted () {
    this.sendSavability()
    this.$refs.compName.focus()
  },
}
</script>

<template lang="pug">
  #create-modifier-list.form
    .comp-info.col.s10.offset-s1
      .comp-name {{modifierList.name || 'New Modifier List'}}
    .pu-form
      .input-field
        input.pu-input(
          v-model='modifierList.name'
          placeholder='Name'
          @keyup='sendSavability()'
          ref='compName'
        )
      .pu-header Selection Method
      .input-field
        .select-method
          label
            input(
              type='checkbox'
              ref='selectMethodInput'
              @click='onSelectMethodClick'
              checked='checked'
              class='filled-in'
            )
            span.pu-checkbox Select One
        .tiny-explain(v-if='modifierList.select_one') User will only be able to select one modifier from the list
        .tiny-explain(v-else) User will be able to select more than modifier from the list
      .pu-header Modifiers
      .modifiers-holder
        .modifier(v-for='(modifier, modifierIdx) in modifierList.modifiers')
          .modifier-inputs.input-field
            input.pu-input.no-focus(
              placeholder='Name'
              v-model='modifier.name'
              @keypress.enter='addModifier()'
              )
            dollar-input(
              :amount='modifier.amount'
              :new='false'
              @currentAmount='setModifierAmount'
            )
            i.material-icons(@click='modifierList.modifiers.splice(modifierIdx, 1)') delete
        .modifier
          .modifier-inputs.input-field
            input.pu-input.no-focus(
              placeholder='Name'
              v-model='newModifier.name'
              ref='newName'
              )
            dollar-input(
              :amount='newModifier.amount'
              @currentAmount='setModifierAmount'
              @submit='addModifier()'
              :new='true'
            )
            i.material-icons(@click='addModifier()') add
    delete-comp
</template>

<style lang="sass" scoped>
  @import '@/global/styles/form.sass'
  #create-modifier-list
    .pu-form
      .select-method
        margin: 10px 0
        padding: 5px 0
      .modifiers-holder
        .modifier
          .modifier-inputs
            margin: 0
            .pu-input, .dollar-input
              width: calc(50% - 12px)
              flex-grow: 4
              margin-bottom: 0
            i
              position: relative
              top: 7px
    .delete-comp
      margin-top: 20px

</style>
