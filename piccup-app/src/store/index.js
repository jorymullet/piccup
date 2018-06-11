import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    venue: {},
    isLoading: true,
    chosen: {
      item: {},
      variation: '',
    },
    menu: {
      categories: [],
      items: [],
      modifiers: [],
      modifier_lists: [],
    },
    orders: [],
  },
  mutations: {
    setVenue (state, cafeId) {
      //retrieves venue info
      db.collection('venues').doc(cafeId).get().then((doc) => {
        if(!doc.exists) {window.alert('No such Cafe')}
        state.venue = doc.data()
      })
      //retrieves menu info
      const menuComponents = ['categories', 'items', 'modifiers','modifier_lists']
      let count = 0
      menuComponents.forEach((menuComponent) => {
        db.collection('venues').doc(cafeId).collection(menuComponent).get().then((coll) => {
          if(coll.empty) {console.log('No ' + menuComponent)}
          state.menu[menuComponent] = []
          coll.docs.forEach((doc) => {
            state.menu[menuComponent].push(doc.data())
          })
          //ensures loading turns off
          count++
          if(count === menuComponents.length) {
            sortMenuElements(state)
            state.isLoading = false
          }
        })
      })
    },
    setItem (state, item) {
      state.chosen.item = item // state.menu.items.find(item => item.id === itemId)
    },
    setVariation (state, variation) {
      state.chosen.variation = variation
    },
    flashLoading (state, cb) {
      state.isLoading = true
      setTimeout(() => {
        cb && cb()
        state.isLoading = false
      }, 200)
    },
    hideLoading (state) {
      state.isLoading = false
    },
    showLoading (state) {
      state.isLoading = true
    },
    updateOrders (state) {
      let currentOrders = localStorage.getItem('order')
      if (currentOrders === null) {
        currentOrders = '[]'
      }
      try {
        currentOrders = JSON.parse(currentOrders)
      } catch (err) {
        currentOrders = []
      }
      this.state.orders = currentOrders
    },
  },
})

function sortMenuElements (state) {
  const sortByAmount = (a,b) => a.amount > b.amount
  state.menu.items.forEach((item) => {
    item.variations.sort(sortByAmount)
  })
  state.menu.modifiers.sort(sortByAmount)
}