import {
  jsonp,
  dateFmt,
  seeLabel,
  currencyFmt,
  resetForm,
  validateForm
} from "./until"

import http from './ajax'

import CONSTANT from './constant'

import echarts from './echarts'

import storage from 'good-storage'

export default {
  install(Vue) {
    Vue.prototype.$dateFilter = dateFmt
    Vue.prototype.$jsonp = jsonp
    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
    Vue.prototype.$CONSTANT = CONSTANT
    Vue.prototype.$echarts = echarts
    Vue.prototype.$resetForm = resetForm
    Vue.prototype.$validateForm = validateForm

    Vue.filter('dateFilter', dateFmt)
    Vue.filter('currency', currencyFmt)
    Vue.filter('seeLabel', seeLabel)
  }
}
