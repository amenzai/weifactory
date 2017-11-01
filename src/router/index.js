import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Login from 'pages/security/login'
import Register from 'pages/security/register'
import Home from 'pages/home'
import Index from 'pages/index'
import UserList from 'pages/manager/userlist'
import UserDetail from 'pages/manager/user-detail'
import BatchList from 'pages/commonview/batchlist'
import BatchDetail from 'pages/commonview/batch-detail'
import DeviceList from 'pages/commonview/devicelist'
import DeviceDetail from 'pages/commonview/device-detail'
import ApplyManage from 'pages/commonview/apply-manage'
import orderPayment from 'pages/commonview/order-payment'
import HistoryData from 'pages/commonview/historydata'
import BtnControl from 'pages/commonview/btn-control'
import ExpertList from 'pages/manager/expertlist'
import ModelList from 'pages/commonview/modellist'
import OrderList from 'pages/commonview/orderlist'
import TrustDeviceList from 'pages/expert/trust-devicelist'

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Index
    }, {
      path: 'manager/userlist',
      name: '用户管理',
      component: UserList
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
      path: 'commonview/devicelist',
      name: '设备管理',
      component: DeviceList
    }, {
      path: 'commonview/device-detail/:id',
      name: '设备信息',
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
      path: 'commonview/historydata',
      name: '历史数据',
      component: HistoryData
    }, {
      path: 'commonview/btn-control',
      name: '设备控制',
      component: BtnControl
    }, {
      path: 'manager/expertlist',
      name: '专家管理',
      component: ExpertList
    }, {
      path: 'commonview/orderlist',
      name: '订单管理',
      component: OrderList
    }, {
      path: 'commonview/modellist',
      name: '风控模型库管理',
      component: ModelList
    }, {
      path: 'expert/trust-devicelist',
      name: '托管设备管理',
      component: TrustDeviceList
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }]
})
