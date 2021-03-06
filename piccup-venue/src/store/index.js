import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editComp: {},
    compTypeInfo: {},
    isNew: false,
    seeLoading: false,
    ordersType: {
      id: 'current',
    },
  },
  mutations: {
    setEditComp (state, editComp) {
      state.editComp = JSON.parse(JSON.stringify(editComp))
    },
    setIsNew (state, isNew) {
      state.isNew = isNew
    },
    setCompTypeInfo (state, compTypeInfo) {
      state.compTypeInfo = compTypeInfo
    },
    setOrdersType (state, ordersType) {
      state.ordersType = ordersType
    },
    showLoading (state) {
      state.seeLoading = true
    },
    hideLoading (state) {
      state.seeLoading = false
    },
  },
})