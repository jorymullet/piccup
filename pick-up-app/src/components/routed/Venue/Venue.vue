<script>
import Navigation from '@/components/common/Navigation'
import VenueInfo from '@/components/common/VenueInfo'

import { db } from '@/main.js'

export default {
  name: 'VenuesList',
  components: {
    navigation: Navigation,
    'venue-info': VenueInfo,
  },
  data () {
    return {
      venue: {}
    }
  },
  firestore () {
    return {
      venue: db.collection('venues').doc(this.$route.params.venueId),
    }
  },
}
</script>

<template lang='pug'>
  #venue
    navigation(:title='venue.name')
    venue-info(:venue='venue')
</template>

<style lang='scss'>
  @import 'vars';
</style>