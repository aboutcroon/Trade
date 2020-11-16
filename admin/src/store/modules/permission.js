import { asyncRoutes, constantRoutes } from '@/router'
import { getAuthMenu } from '@/api/user'
import Layout from '@/layout'
import { getUserInfo } from '@/utils/auth' /**获取用户信息 */
import { alertMsg } from '@/utils/alert' /*消息提示*/

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
 /**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    /**判断二级菜单 */
    var arr = [];
    if (item.children.length != 0) {
      item.children.forEach(c => {
        if (item.children.length > 1) {
          if (c.hiddened == true) {
            arr.push(c)
          }
        } else {
          arr.push(c)
        }
        /**将子级中显示的值并切大于1的icon置空 */
        arr.forEach(a => {
          if (arr.length > 1) {
            a.meta.icon = ''
          }
        })
      })
    }
    const menu = {
      path: item.path,
      component: item.component === '#' ? Layout :(resolve) => require([`@/views/${item.component}/index`], resolve),
      hidden: !item.hiddened,
      //redirect: item.redirect,
      children: [],
      name: item.component === '#' ? 'menu' + item.menuId : item.component,
      meta: arr.length == 1 ? '' : item.meta,
      props: item.hiddened == true ? true : null
      // meta: { title: item.name, id: item.id, roles: ['admin'] }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = [];
      getAuthMenu({ 'userId': getUserInfo()['id']}).then(response => {
        
        if (response.code !== "200") {
          alert(JSON.stringify('菜单数据加载异常'))
        } else {
          var data = response.data
          //data[0].path = '/';
          Object.assign(loadMenuData, data)
          const tempAsyncRoutes = Object.assign([], asyncRoutes)

          generaMenu(tempAsyncRoutes, loadMenuData)
          let accessedRoutes
          if (roles.includes('admin')) {
            accessedRoutes = tempAsyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(tempAsyncRoutes, roles)
          }
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch(error => {
      })
    })
  }
  // generateRoutes({ commit }, roles) {
  //   return new Promise(resolve => {
  //     let accessedRoutes
  //     if (roles.includes('admin')) {
  //       accessedRoutes = asyncRoutes || []
  //     } else {
  //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //     }
  //     commit('SET_ROUTES', accessedRoutes)
  //     resolve(accessedRoutes)
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
