import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = (resolve) => {
  import('pages/security/login').then((module) => {
    resolve(module)
  })
}

const Register = (resolve) => {
  import('pages/security/register').then((module) => {
    resolve(module)
  })
}

const Home = (resolve) => {
  import('pages/home').then((module) => {
    resolve(module)
  })
}

const Index = (resolve) => {
  import('pages/index').then((module) => {
    resolve(module)
  })
}

const UserList = (resolve) => {
  import('pages/manager/userlist').then((module) => {
    resolve(module)
  })
}

const UserDetail = (resolve) => {
  import('pages/manager/user-detail').then((module) => {
    resolve(module)
  })
}

const BatchList = (resolve) => {
  import('pages/commonview/batchlist').then((module) => {
    resolve(module)
  })
}

const BatchDetail = (resolve) => {
  import('pages/commonview/batch-detail').then((module) => {
    resolve(module)
  })
}

const DeviceList = (resolve) => {
  import('pages/commonview/devicelist').then((module) => {
    resolve(module)
  })
}

const UserIndex = (resolve) => {
  import('pages/commonview/device-detail').then((module) => {
    resolve(module)
  })
}

const DeviceManage = (resolve) => {
  import('pages/commonview/apply-manage').then((module) => {
    resolve(module)
  })
}

const orderPayment = (resolve) => {
  import('pages/commonview/order-payment').then((module) => {
    resolve(module)
  })
}

const HistoryData = (resolve) => {
  import('pages/commonview/historydata').then((module) => {
    resolve(module)
  })
}

const BtnControl = (resolve) => {
  import('pages/commonview/btn-control').then((module) => {
    resolve(module)
  })
}

const ExpertList = (resolve) => {
  import('pages/manager/expertlist').then((module) => {
    resolve(module)
  })
}

const ModelList = (resolve) => {
  import('pages/commonview/modellist').then((module) => {
    resolve(module)
  })
}

const OrderList = (resolve) => {
  import('pages/commonview/orderlist').then((module) => {
    resolve(module)
  })
}

const TrustDeviceList = (resolve) => {
  import('pages/expert/trust-devicelist').then((module) => {
    resolve(module)
  })
}

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
      component: UserIndex
    }, {
      path: 'commonview/apply-manage',
      name: '申请专家托管',
      component: DeviceManage
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
