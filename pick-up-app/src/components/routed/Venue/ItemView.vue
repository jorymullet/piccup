<script>
import { toDollars } from '@/global/helpers/currency.js'
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
  },
  methods: {
    toDollars,
    setVariation (variationId) {
      this.$store.commit('setVariation', variationId)
    }
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
      #item-info-holder.col.s12.m10.l8
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
                      :checked='vari.id === variation'
                      @click='setVariation(vari.id)'
                      )
                    span {{toDollars(vari.amount)}}
                .name.click-me(@click='setVariation(vari.id)') {{vari.name}}

</template>

<style scoped lang='scss'>
  @import 'vars';
  #item-info-holder {
    .info-box {
      .info-title {

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