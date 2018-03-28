import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import state from './state'
// import mutations from './mutations'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
// export default new Vuex.Store({
//   actions,
//   getters,
//   state,
//   mutations,
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// })

const state = {
  loading: false,
  userId: window.sessionStorage.getItem('__uid__') ? parseInt(window.sessionStorage.getItem('__uid__')) : '',
  userInfo: window.sessionStorage.getItem('__userInfo__') ? JSON.parse(window.sessionStorage.getItem('__userInfo__')) : '',
  orderPay: {},
  batchInfo: window.sessionStorage.getItem('__batchInfo__') ? JSON.parse(window.sessionStorage.getItem('__batchInfo__')) : ''
}
const store = new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.loading = status
    },
    UPDATE_USER(state, userInfo) {
      state.userInfo = userInfo
      if (userInfo) {
        window.sessionStorage.setItem('__userInfo__', JSON.stringify(userInfo))
      } else {
        window.sessionStorage.removeItem('__userInfo__')
      }
    },
    UPDATE_USERID(state, userId) {
      state.userId = userId
      if (userId) {
        window.sessionStorage.setItem('__uid__', userId)
      } else {
        window.sessionStorage.removeItem('__uid__')
      }
    },
    UPDATE_BATCH_INFO(state, batchInfo) {
      state.batchInfo = batchInfo
      if (batchInfo) {
        window.sessionStorage.setItem('__batchInfo__', JSON.stringify(batchInfo))
      } else {
        window.sessionStorage.removeItem('__batchInfo__')
      }
    }
  }
})

export default store

