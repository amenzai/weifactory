import axios from 'axios'
import store from '../../store'
import router from '../../router'
import config from './config'
import { Message, Notification } from 'element-ui'
import querystring from 'querystring'

const commit = store.commit || store.dispatch
const base = ''

// axios.defaults.headers = {
//   referer: 'http://api.weifactory.vastsum.net:8852',
//   host: 'api.weifactory.vastsum.net:8852'
// }
axios.defaults.withCredentials = true
axios.defaults.baseURL = config.httpServer
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = [
  function(data) {
    return querystring.stringify(data)
  }
]
axios.defaults.paramsSerializer = function(params) {
  return querystring.stringify(params, {
    arrayFormat: 'brackets'
  })
}

axios.interceptors.request.use(function(config) {
  commit('UPDATE_LOADING', true)
  return config
}, function(error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function(response) {
  if (response.status === 200) {
    if (response.data.code === 401) {
      console.log('登录超时')
      Notification({
        title: '登录超时',
        message: '登录超时',
        type: 'error'
      })
      router.push('/login')
    } else if (response.data.code === 303) { //  api权限
      Notification({
        title: '错误',
        message: '该接口你没有权限！',
        type: 'error'
      })
    }
  }
  // 不显示loading
  commit('UPDATE_LOADING', false)
  return response
}, function(error) {
  // 对响应错误做点什么
  commit('UPDATE_LOADING', false)
  const title = '服务正在升级，请稍后再试！';
  Notification({
    title: title,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

function trimObject(data, type) {
  var obj = JSON.parse(JSON.stringify(data));
  for (var k in obj) {
    if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'String') {
      obj[k] = obj[k].trim()
      if (obj[k] === '' && type === undefined) {
        delete obj[k];
      }
    } else if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'Object') {
      trimObject(obj[k])
    }
  }
  return obj
}

export default {
  get: function (path, params) {
    var config
    if (params === void 0) {
      config = base + path
    } else {
      // params = trimObject(params, type) //  type为true不过滤空字符串的发送
      config = base + path + '/' + params
    }
    return new Promise((resolve, reject) => {
      axios.get(config).then(res => {
        if (res.data.success) {
          resolve(res.data)
        } else {
          Message({
            message: res.data.message,
            type: 'error'
          })
          reject(res.data)
        }
      })
    })
  },
  post: function(path, params, type) {
    if (params === void 0) {
      params = {}
    }
    params = trimObject(params, type)
    return new Promise((resolve, reject) => {
      axios.post(base + path, params).then(res => {
        if (res.data.success) {
          resolve(res.data)
        } else {
          Message({
            message: res.data.message,
            type: 'error'
          })
          reject(res.data)
        }
      })
    })
  }
}