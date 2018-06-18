<script>
import bus from '@/global/eventBus.js'

export default {
  name: 'DollarInput',
  props: {
    amount: {
      default: '',
    },
    new: {
      type: Boolean,
    },
  },
  data () {
    return {
      newAmount: '',
      dummy: '',
      cursorRight: '40',
      caretColor: 'black',
    }
  },
  computed: {
    placeHolderValue () {
      this.$emit('currentAmount', this.newAmount)
      this.newAmount = this.newAmount.toString()
      const len = this.newAmount.length || 0

      if(len < 3) {
        return '$0.00'.substring(0, 5 - len) + this.newAmount
      }
      else{
        return '$' + this.newAmount.substring(0, len - 2) + '.' + this.newAmount.substring(len - 2)
      }
    },
  },
  methods: {
    onAmountKeyDown (e) {
      this.caretColor = "transparent"
      if(e.code === 'Minus') {
        e.preventDefault()
      }
    },
    onAmountKeyUp (e) {
      if(this.$el) {
        this.cursorRight = Math.max(40, this.$el.children[1].children[0].offsetWidth + 2)
        this.caretColor = 'black'
      }
    },
  },
  created () {
    this.newAmount = this.amount
    if(this.new) {
      bus.$on('resetDollarInput', () => {
        this.newAmount = ''
      })
    }
  },
  mounted () {
    if(this.$el.childNodes[0]) {
      this.$el.childNodes[0].addEventListener('focus', function () {
        const temp = this.value
        this.value = ''
        this.value = temp
      })
    }
    else {
      console.log(this.$el)
    }
  }
}
</script>

<template lang="pug">
  .dollar-input
    input.pu-input.type-into.no-border(
      v-model='newAmount'
      type='number'
      :style='{width: cursorRight + "px", "caret-color": caretColor}'
      ref='newAmount'
      @keydown='onAmountKeyDown'
      @keyup='onAmountKeyUp'
      @keypress.enter='$emit("submit")'
    )
    .no-focus.overlay(
      :style='{opacity: newAmount ? 1 : .2}'
      @click='$refs.newAmount.focus()'
    )
      span {{placeHolderValue}}
</template>

<style lang="sass" scoped>
  @import '@/global/styles/form.sass'
  @import '@/global/styles/variables.sass'
  .dollar-input
    position: relative
    display: inline-block
    border-bottom: $input-border
    .dollar
      position: absolute
    .sign
      top: .83em
    .type-into
      width: 40px
      margin-bottom: 0
      text-align: right
      color: transparent
      caret-color: black
      border: none
      z-index: 2
    .overlay
      color: black
      text-indent: 0
      position: absolute
      left: 0
      top: 0
      z-index: 1
      width: 100%
      height: 3rem
      line-height: 3.15
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif
      span
        display: inline-block
</style>
