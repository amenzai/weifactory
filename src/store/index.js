import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'good-storage'

Vue.use(Vuex)

const UID = '__uid__'
const USER_INFO = '__userInfo__'
const BATCH_INFO = '__batchInfo__'
const DICT_INFO = '__dicInfo__'

const state = {
  loading: false,
  userId: storage.session.get(UID, ''),
  userInfo: storage.session.get(USER_INFO, {}),
  batchInfo: storage.session.get(BATCH_INFO, {}),
  dicInfo: storage.session.get(DICT_INFO, {}),
  orderPay: {}
}
const store = new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING(state, status) {
      state.loading = status
    },
    UPDATE_USER(state, userInfo) {
      state.userInfo = userInfo
      storage.session.set(USER_INFO, userInfo)
    },
    UPDATE_USERID(state, userId) {
      state.userId = userId
      storage.session.set(UID, userId)
    },
    UPDATE_BATCH_INFO(state, batchInfo) {
      state.batchInfo = batchInfo
      storage.session.set(BATCH_INFO, batchInfo)
    },
    UPDATE_DICT_INFO(state, dicInfo) {
      state.dicInfo = dicInfo
      storage.session.set(DICT_INFO, dicInfo)
    },
    UPDATE_ORDER(state, orderData) {
      state.orderPay = orderData
    }
  }
})

export default store
