// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import store from './store'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(VueFire)
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

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store,
})
