import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    venue: {},
    categories: [],
    items: [],
    modifiers: [],
    isLoading: true,
    chosen: {
      item: {},
      variation: '',
    },
  },
  mutations: {
    setVenue (state, cafeId) {
      //retrieves venue info
      db.collection('venues').doc(cafeId).get().then((doc) => {
        if(!doc.exists) {window.alert('No such Cafe')}
        state.venue = doc.data()
      })
      //retrieves menu info
      const menuComponents = ['categories', 'items', 'modifiers']
      let count = 0
      menuComponents.forEach((menuComponent) => {
        db.collection('venues').doc(cafeId).collection(menuComponent).get().then((coll) => {
          if(coll.empty) {console.log('No ' + menuComponent)}
          state[menuComponent] = []
          coll.docs.forEach((doc) => {
            state[menuComponent].push(doc.data())
          })
          //ensures loading turns off
          count++
          if(count === menuComponents.length) {
            sortItemVariations(state)
            state.isLoading = false
          }
        })
      })
    },
    setItem (state, itemId) {
      state.chosen.item = state.items.find(item => item.id === itemId)
    },
    setVariation (state, variationId) {
      state.chosen.variation = variationId
    },
    hideLoading (state) {
      state.isLoading = false
    },
    showLoading (state) {
      state.isLoading = true
    }
  },
})

function sortItemVariations (state) {
  state.items.forEach((item) => {
    item.variations.sort((a,b) => a.amount > b.amount)
  })
}