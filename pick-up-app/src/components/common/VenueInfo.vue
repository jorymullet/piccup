<script>
import { db } from '@/main.js'

export default {
  name: 'VenueInfo',
  props: {
    venue: {
      type: Object,
    },
  },
}
</script>

<template lang='pug'>
  #venue-info
    .row
      .col.l8.offset-l2.m10.offset-m1.s12
        .card 
          .card-content 
            .name {{venue.name}}
            .address {{venue.address_string}}
</template>

<style lang='scss'>
  @import 'vars';
</style>