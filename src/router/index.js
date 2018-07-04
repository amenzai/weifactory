import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import route from './route.json'

Vue.use(Router)

const registerRoute = (navConfig) => {
  const route = []
  route.push({
    path: '*',
    redirect: {
      path: '/404'
    }
  })
  // route.push({
  //   path: '/',
  //   redirect: '/security/login'
  // })
  navConfig.forEach((nav) => {
    const node = buildRoute(nav);
    if (nav.children) {
      node.children = [];
      nav
        .children
        .forEach(nav => {
          node
            .children
            .push(buildRoute(nav));
        })
    }
    route.push(node);
  })

  function buildRoute(nav) {
    return {
      path: nav.path || '',
      name: nav.name || '',
      component: require(`pages/${nav.page}`),
      meta: {
        title: nav.title || nav.name
        // parentName: nav.parent,
        // noCache: !!nav.noCache
      }
    };
  }

  return route
}
const routes = registerRoute(route)
console.log(routes)

const myRouter = new Router({
  mode: 'hash',
  base: __dirname,
  routes
})

const commit = store.commit
const loginUrl = '/security/login'
myRouter.beforeEach((to, from, next) => {
  if (to.path === loginUrl) {
    commit('UPDATE_USER', '')
    commit('UPDATE_USERID', '')
  }
  if (!store.state.userId && to.path !== loginUrl && to.path.indexOf('/security/register') < 0) {
    next(loginUrl)
  } else {
    // commit('UPDATE_LOADING', true)
    if (to.path !== from.path) {
      window.document.title = to.meta.title
    }
    next()
  }
})

// myRouter.afterEach(route => {
//   commit('UPDATE_LOADING', false)
// })

export default myRouter
