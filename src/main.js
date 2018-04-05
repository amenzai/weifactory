// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueCookie from 'vue-cookie'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './common/less/index.less'
import utils from './common/js'
import ElementUI from './components/element-ui'
import App from './App'
// import Components from './components'

import store from './store'

// Vue.use(VueCookie)
Vue.use(ElementUI)
// Vue.use(Components)
Vue.use(utils)

// Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
