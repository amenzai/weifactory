import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false,
  url: window.sessionStorage.getItem('url') || '',
  user: window.sessionStorage.getItem('user') || '',
  userId: '',
  orderPay: {}
}
const store = new Vuex.Store({
  state: state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.loading = status
    },
    UPDATE_URL(state, url) {
      state.url = url
      if (url) {
        window.sessionStorage.setItem('url', url)
      } else {
        window.sessionStorage.removeItem('url')
      }
    },
    UPDATE_USER(state, user) {
      state.user = user
      if (user) {
        window.sessionStorage.setItem('user', user)
      } else {
        window.sessionStorage.removeItem('user')
      }
    },
    UPDATE_ORDER(state, orderPay) {
      state.orderPay = orderPay
    },
    UPDATE_USERID(state, userId) {
      state.userId = userId
    }
  }
})

export default store

