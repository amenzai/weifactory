import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: false,
  user: JSON.parse(window.sessionStorage.getItem('user')) || '',
  userId: parseInt(window.sessionStorage.getItem('userId')) || '',
  orderPay: {}
}
const store = new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.loading = status
    },
    UPDATE_USER(state, user) {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    UPDATE_ORDER(state, orderPay) {
      state.orderPay = orderPay
    },
    UPDATE_USERID(state, userId) {
      state.userId = userId
      window.sessionStorage.setItem('userId', userId)
    }
  }
})

export default store

