import { login, logout, getInfo, tokenRefresh, ukeyLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getUserInfo } from "@/utils/auth"; /**获取用户信息 */
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  roleType: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERROLETYPE: (state, type) => {
    state.roleType = type
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captchaToken, captcha, usbkey } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, captchaToken: captchaToken, captcha: captcha, usbkey: usbkey }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_USERROLETYPE', data.role.roleType)
        resolve()
        localStorage.setItem('trademark.admin.userInfo', JSON.stringify(data))
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin'],
        name: getUserInfo()["username"],
        introduction: 'admin',
        avatar: 'admin'
      }
      if (!data) {
        reject('Verification failed, please Login again.')
      }
      const { roles, name, avatar, introduction } = data
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      resetRouter()
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      router.addRoutes(accessRoutes)
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // 重新获取token
  tokenRefresh({ commit }) {
    return new Promise((resolve, reject) => {
      tokenRefresh({ 'token': getToken() }).then(response => {
        commit('SET_TOKEN', response.data)
        setToken(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
