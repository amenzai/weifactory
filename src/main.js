// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueCookie from 'vue-cookie'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './common/less/index.less'
import until from './common/js'
import {
  Loading
} from 'element-ui'
import ElementUI from './components/element-ui'
import App from './App'
// import Components from './components'
import {
  sync
} from 'vuex-router-sync'
import store from './store'

// Vue.use(VueCookie)
Vue.use(ElementUI)
// Vue.use(Components)
Vue.use(until)
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
// Vue.config.productionTip = false
Vue.config.devtools = true

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
