import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import store from './store'

import VueFirestore from 'vue-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFirestore)

firebase.initializeApp({
  projectId: 'pick-up-ftw',
  databaseURL: 'https://pick-up-ftw.firebaseio.com'
})

const firestore = firebase.firestore()
const settings = {
  timestampsInSnapshots: true,
}
firestore.settings(settings)
export const db = firestore

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store: store,
})
