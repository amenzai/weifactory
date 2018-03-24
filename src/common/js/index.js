import { 
  jsonp,
  getDicArr,
  dateFmt,
  toJSON,
  getLabel,
  seeLabel,
  currencyFmt,
  temperatureFmt,
  humidityFmt
 } from "./filter"

 import ajax from './ajax'

 import CONSTANT from './constant'

 import echarts from './echarts'

 export default {
   install(Vue) {
     Vue.prototype.$getDicArr = getDicArr
     Vue.prototype.$dateFilter = dateFmt
     Vue.prototype.$toJSON = toJSON
     Vue.prototype.$jsonp = jsonp
     Vue.prototype.$ajax = ajax
     Vue.prototype.$CONSTANT = CONSTANT
     Vue.prototype.$echarts = echarts

     Vue.filter('getLabel', getLabel)
     Vue.filter('dateFilter', dateFmt)
     Vue.filter('currency', currencyFmt)
     Vue.filter('temperature', temperatureFmt)
     Vue.filter('humidity', humidityFmt)
     Vue.filter('seeLabel', seeLabel)
   }
 }