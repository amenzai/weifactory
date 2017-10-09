// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// import iView from 'iview';

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import './common/theme/index.css'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import ui from './ui'
import './common/css/style.css'
import MyFilter from './common/js/filter.js'
// import Components from './components'
import {
  sync
} from 'vuex-router-sync'
// import VueCookie from 'vue-cookie'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import ajax from './common/js/ajax.js'
import appconfig from './appconfig.js'
import CONSTANT from './common/js/constant.js'
import echarts from 'echarts'

Vue.use(Vuex)
// Vue.use(VueCookie)
// Vue.use(Components)
Vue.use(MyFilter)
Vue.use(VueAxios, Axios)
Vue.use(ElementUI)
// Vue.use(iView)
Vue.use(ui)

// Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$ajax = ajax
Vue.prototype.$appconfig = appconfig //  一些全局配置
Vue.prototype.$CONSTANT = CONSTANT //  一些全局常量配置
Vue.prototype.$echarts = echarts 

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
