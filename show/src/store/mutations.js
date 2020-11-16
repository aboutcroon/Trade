import Cookies from 'js-cookie'
import { getSaveToken } from '@/api/token.js'
const tokenName = process.env.VUE_APP_TOKENNAME

/* mutations */
export default {
  /* 存储用户信息 */
  setUserInfo(state, data) {
    const { username, mobile, email } = data
    state.userinfo = {
      username,
      mobile,
      email,
      roleType: data.role.roleType,
    }
    this.commit('loginStatus')
  },
  setToken(state, token) {
    state.token = token
    Cookies.set(tokenName, token)
  },
  setTokenLocal(state, token) {
    state.token = token
    window.localStorage.setItem(tokenName, token)
  },
  /* 变更登录状态 */
  loginStatus(state) {
    state.auth = true
  },
  getToken(state) {
    const value = getSaveToken(tokenName)
    state.token = value
    return value
  },
  clearToken(state) {
    state.token = ''
    Cookies.remove(tokenName)
    window.localStorage.setItem(tokenName, '')
  },
  /* 退出登录 */
  signOut(state) {
    state.userinfo = {}
    state.auth = false
    this.commit('clearToken')
  }
}