<script>
import { toDollars } from '@/global/helpers/currency.js'
import { addToCart } from '@/global/helpers/cart.js'
import Navigation from '@/components/common/Navigation'

export default {
  name: 'ItemView',
  components: {
    'navigation': Navigation,
  },
  computed: {
    item () {
      return this.$store.state.chosen.item
    },
    variation () {
      return this.$store.state.chosen.variation
    },
    modifierLists () {
      return this.$store.state.menu.modifier_lists.filter((ml) => {
        return this.item.modifier_list_ids.includes(ml.id)
      })
    },
    modifiers () {
      return this.$store.state.menu.modifiers
    },
    availableModifiers () {
      const availableModifierIds = [].concat.apply([], this.modifierLists
        .map((modifierList) => {return modifierList.modifier_ids}))
      return this.modifiers.filter((modi) => {return availableModifierIds.includes(modi.id)})
    },
    selectedModifiers () {
      return this.availableModifiers.filter((modi) => {
        return document.getElementById(modi.id).checked
      })
    },
  },
  methods: {
    toDollars,
    addToOrder () {
      const orderedItem = {
        item: this.item,
        variation: this.variation,
        venue: this.$store.state.venue,
        modifiers: this.selectedModifiers,
        quantity: 1,
      }
      addToCart(orderedItem)
      this.$store.commit('flashLoading', () => {
        this.$router.push({name: 'Checkout', params: {venueId: this.$store.state.venue.id}})
      })
    },
  },
}
</script>

<template lang='pug'>
  #item-view
    navigation(
      left_action='hideItemView'
      left_word='$back'
      :title='item.name'
      @hideItemView='$emit("hideItemView")'
      )
    .row
      #item-info-holder.col.s12.m10.offset-m1.l8.offset-l2
        .info-box
          .info-title SIZES
          .info-holder.card
            .card-content
              .variation.info-item(v-for='vari in item.variations') 
                p
                  label
                    input(
                      type='radio'
                      name='variation'
                      :checked='vari.id === variation.id'
                      @click='$store.commit("setVariation", vari)'
                      )
                    span.name {{vari.name}}
                    .amount.click-me(@click='$store.commit("setVariation", vari)') {{toDollars(vari.amount)}}
        .info-box(v-for='modifier_list in modifierLists')
          .info-title {{modifier_list.name}}
          .info-holder.card
            .card-content
              .modifier.info-item(
                v-for='modifier in modifiers'
                v-if='modifier_list.modifier_ids.includes(modifier.id)'
                ) 
                p
                  label
                    input(
                      :type='modifier_list.select_one ? "radio" : "checkbox"'
                      :name='modifier_list.id'
                      :id='modifier.id'
                      )
                    span.name {{modifier.name}}
                    .amount.click-me(@click='') {{toDollars(modifier.amount)}}
        .waves-effect.waves-light.btn(@click='addToOrder()') ADD TO ORDER

</template>

<style scoped lang='scss'>
  @import 'vars';
  #item-info-holder {
    .info-box {
      padding-top: 15px;
      .info-title {
        font-size: 1.5em;
      }
      .info-holder {
        border-radius: 5px;
        border: thin black solid;
        .card-content {
          display: flex;
          .info-item {
            flex-grow: 1;
            text-align: center;
          }
        }
      }
    }
  }
</style>