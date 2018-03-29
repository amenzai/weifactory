import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import Login from 'pages/security/login'
import Register from 'pages/security/register'
import Home from 'pages/home'
import Index from 'pages/index'
import UserList from 'pages/manager/userlist'
import UserDetail from 'pages/manager/user-detail'
import DictList from 'pages/manager/dictlist'
import BatchList from 'pages/commonview/batchlist'
import BatchDetail from 'pages/commonview/batch-detail'
import DeviceList from 'pages/manager/devicelist'
import DeviceSn from 'pages/manager/device-sn'
import DeviceDetail from 'pages/commonview/device-detail'
import ApplyManage from 'pages/commonview/apply-manage'
import orderPayment from 'pages/commonview/order-payment'
import BtnControl from 'pages/commonview/btn-control'
import ExpertList from 'pages/manager/expertlist'
import RoleList from 'pages/manager/rolelist'
import MenuList from 'pages/manager/menulist'
import MenuPermission from 'pages/manager/menu-permission'
import ModelList from 'pages/commonview/modellist'
import ModelDetail from 'pages/commonview/model-detail'
import OrderList from 'pages/commonview/orderlist'
import OrderDetail from 'pages/commonview/order-detail'
import TrustDeviceList from 'pages/expert/trust-devicelist'
import PicManage from 'pages/commonview/pic-manage'
import ConcatlogManage from 'pages/manager/concatlog-manage'
import ExceptionManage from 'pages/commonview/exception-manage'
import PaySuccess from 'pages/commonview/pay-success'
import Setting from 'pages/commonview/setting'
import HandSetting from 'pages/commonview/hand-setting'
import HistoryData from 'pages/commonview/history-data'

const myRouter = new Router({
  mode: 'hash',
  base: __dirname,
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      name: '首页',
      component: Index
    }, {
      path: 'manager/userlist',
      name: '用户管理',
      component: UserList
    }, {
      path: 'manager/dictlist',
      name: '字典管理',
      component: DictList
    }, {
      path: 'manager/user-detail',
      name: '用户详情',
      component: UserDetail
    }, {
      path: 'commonview/batchlist',
      name: '批次管理',
      component: BatchList
    }, {
      path: 'commonview/batch-detail',
      name: '批次详情',
      component: BatchDetail
    }, {
      path: 'manager/devicelist',
      name: '设备管理',
      component: DeviceList
    }, {
      path: 'manager/device-sn',
      name: '设备序列号管理',
      component: DeviceSn
    }, {
      path: 'commonview/device-detail/:id',
      name: '设备批次信息',
      component: DeviceDetail
    }, {
      path: 'commonview/apply-manage',
      name: '申请专家托管',
      component: ApplyManage
    }, {
      path: 'commonview/order-payment',
      name: '订单支付',
      component: orderPayment
    }, {
      path: 'commonview/btn-control',
      name: '设备控制',
      component: BtnControl
    }, {
      path: 'commonview/setting',
      name: '参数设置',
      component: Setting
    }, {
      path: 'commonview/hand-setting',
      name: '手动控制',
      component: HandSetting
    }, {
      path: 'commonview/history-data',
      name: '历史数据',
      component: HistoryData
    }, {
      path: 'manager/expertlist',
      name: '专家管理',
      component: ExpertList
    }, {
      path: 'manager/rolelist',
      name: '角色管理',
      component: RoleList
    }, {
      path: 'manager/menulist',
      name: '菜单管理',
      component: MenuList
    }, {
      path: 'manager/menu-permission',
      name: '角色菜单权限',
      component: MenuPermission
    }, {
      path: 'commonview/orderlist',
      name: '订单管理',
      component: OrderList
    }, {
      path: 'commonview/order-detail',
      name: '订单详情',
      component: OrderDetail
    }, {
      path: 'commonview/modellist',
      name: '风控模型库管理',
      component: ModelList
    }, {
      path: 'commonview/model-detail',
      name: '风控模型详情',
      component: ModelDetail
    }, {
      path: 'expert/trust-devicelist',
      name: '托管设备管理',
      component: TrustDeviceList
    }, {
      path: 'commonview/pic-manage',
      name: '图片管理',
      component: PicManage
    }, {
      path: 'manager/concatlog-manage',
      name: '连接日志管理',
      component: ConcatlogManage
    }, {
      path: 'commonview/exception-manage',
      name: '异常管理',
      component: ExceptionManage
    }, {
      path: 'commonview/pay-success',
      name: '支付成功',
      component: PaySuccess
    }]
  }, {
    path: '/login',
    name: '用户登录',
    component: Login
  }, {
    path: '/register',
    name: '用户注册',
    component: Register
  }]
})

const commit = store.commit
const loginUrl = '/login'
myRouter.beforeEach((to, from, next) => {
  if (to.path === loginUrl) {
    commit('UPDATE_USER', '')
    commit('UPDATE_USERID', '')
  }
  if (!store.state.userId && to.path !== loginUrl && to.path.indexOf('register') < 0) {
    next(loginUrl)
  } else {
    // commit('UPDATE_LOADING', true)
    if (to.path !== from.path) {
      window.document.title = to.name
    }
    next()
  }
})

// myRouter.afterEach(route => {
//   commit('UPDATE_LOADING', false)
// })

export default myRouter