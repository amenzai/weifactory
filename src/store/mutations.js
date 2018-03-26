import * as types from './mutation-types'

const mutations = {
  [types.UPDATE_LOADING](state, status) {
    state.loading = status
  },
  [types.UPDATE_USER](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.UPDATE_ORDER](state, orderPay) {
    state.orderPay = orderPay
  }
}

export default mutations