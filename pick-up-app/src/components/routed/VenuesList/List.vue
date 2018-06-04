<script>
import { db } from '@/main.js'

export default {
  name: 'List',
  data () {
    return {
      venues: [],
    }
  },
  firestore () {
    return {
      venues: db.collection('venues').orderBy('name'),
    }
  },
}
</script>

<template lang='pug'>
  #list-holder
    .list.row
      .col.s12.m8.offset-m2.l6.offset-l3
        router-link(
          v-for='(venue, idx) in venues'
          :to='"/venues/"+venue.id'
          :key='idx'
        )
          .card.venue.click-me
            .card-content
              .card-title {{venue.name}}
</template>

<style scoped lang='scss'>
  @import 'vars';
</style>