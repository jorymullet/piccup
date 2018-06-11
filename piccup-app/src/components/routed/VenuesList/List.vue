<script>
import { db } from '@/main.js'

export default {
  name: 'List',
  data () {
    return {
      venues: [],
    }
  },
  methods: {
    goToVenue (venueId) {
      this.$store.commit('showLoading')
      //this.$store.commit('setVenue', venueId)
      this.$router.push({name: 'Venue', params: {venueId: venueId}})
    },
  },
  mounted () {
    this.$bind('venues', db.collection('venues'))
      .then(() => {this.$store.commit('hideLoading')})
  }
}
</script>

<template lang='pug'>
  #list-holder
    .list.row
      .col.s12.m8.offset-m2.l6.offset-l3
        .card.venue.click-me(
          v-for='(venue, idx) in venues'
          @click='goToVenue(venue.id)'
        )
          .card-content
            .card-title {{venue.name}}
</template>

<style scoped lang='scss'>
  @import 'vars';
</style>