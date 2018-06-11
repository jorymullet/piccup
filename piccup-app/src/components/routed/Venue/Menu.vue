<script>
import { toDollars } from '@/global/helpers/currency.js'
import { db } from '@/main.js'

export default {
  name: 'Menu',
  computed: {
    categories () {
      return this.$store.state.menu.categories
    },
    items () {
      return this.$store.state.menu.items
    },
  },
  methods: {
    toDollars,
    goToItem (itemId, variationId) {
      this.$store.commit('setItem', itemId)
      this.$store.commit('setVariation', variationId)
      this.$emit('seeItemView')
    },
  }
}
</script>

<template lang='pug'>
  #venue-info
    .row
      .col.l8.offset-l2.m10.offset-m1.s12
        ul.collapsible
          li(
            v-for='category in categories'
            )
            .collapsible-header {{category.name}}
            .collapsible-body
              .card(
                v-for='item in items'
                v-if='item.category_ids.includes(category.id)'
                )
                .card-content
                  .card-title {{item.name}}
                  .variations-holder
                    .variation.click-me(
                      v-for='variation in item.variations'
                      @click='goToItem(item, variation)'
                      )
                      .abbreviation {{variation.abbreviation}}
                      .amount {{toDollars(variation.amount)}}
</template>

<style scoped lang='scss'>
  @import 'vars';
  .card .card-content {
    padding: 15px 15px 0px;
  }
  .collapsible {
    border: none;
    .collapsible-header:focus {
      outline: none;
    }
    .collapsible-body {
      padding: 5px;
      .card-content {
        padding: 0 15px 0;
        .variations-holder {
          width: 100%;
          display: flex;
          padding: 16px 0;
          .variation {
            flex-grow: 1;
            flex-direction: row;
            display: flex;
            margin-right: 10px;
            $variation-border-radius: 4px;
            $variation-padding: 4px;
            .abbreviation {
              background-color: $secondary-color;
              color: white;
              width: 25px;
              border-top-left-radius: $variation-border-radius;
              border-bottom-left-radius: $variation-border-radius;
              text-align: center;
              padding: $variation-padding 0;
            }
            .amount {
              flex-grow: 2;
              text-align: center;
              border: thin black solid;
              border-top-right-radius: $variation-border-radius;
              border-bottom-right-radius: $variation-border-radius;
              border-left: none;
              padding: $variation-padding;
            }
          }
          .variation:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>