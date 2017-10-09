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
  import('pages/manager/batchlist').then((module) => {
    resolve(module)
  })
}

const BatchDetail = (resolve) => {
  import('pages/manager/batch-detail').then((module) => {
    resolve(module)
  })
}

const DeviceList = (resolve) => {
  import('pages/manager/devicelist').then((module) => {
    resolve(module)
  })
}

const UserDeviceList = (resolve) => {
  import('pages/user/devicelist').then((module) => {
    resolve(module)
  })
}

const UserIndex = (resolve) => {
  import('pages/user/index').then((module) => {
    resolve(module)
  })
}

const DeviceManage = (resolve) => {
  import('pages/user/device-manage').then((module) => {
    resolve(module)
  })
}

const HistoryData = (resolve) => {
  import('pages/user/historydata').then((module) => {
    resolve(module)
  })
}

const BtnControl = (resolve) => {
  import('pages/manager/btn-control').then((module) => {
    resolve(module)
  })
}

const ExpertList = (resolve) => {
  import('pages/manager/expertlist').then((module) => {
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
      path: 'manager/batchlist',
      name: '批次管理',
      component: BatchList
    }, {
      path: 'manager/batch-detail',
      name: '批次详情',
      component: BatchDetail
    }, {
      path: 'manager/devicelist',
      name: '设备管理',
      component: DeviceList
    }, {
      path: 'user/devicelist',
      name: '个人设备管理',
      component: UserDeviceList
    }, {
      path: 'user/index/:id',
      name: '个人设备信息',
      component: UserIndex
    }, {
      path: 'user/device-manage',
      name: '设备托管',
      component: DeviceManage
    }, {
      path: 'user/historydata',
      name: '历史数据',
      component: HistoryData
    }, {
      path: 'manager/btn-control',
      name: '按钮开关',
      component: BtnControl
    }, {
      path: 'manager/expertlist',
      name: '专家列表',
      component: ExpertList
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }]
})
