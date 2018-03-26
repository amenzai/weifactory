import {loadUserInfo} from 'common/js/cache'

const state = {
  loading: false,
  userInfo: getUserInfo(),
  orderPay: {}
}

export default state