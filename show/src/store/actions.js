import { getFun } from '@/api/transit.js'
/* token登录 */
function fetchUserInfo() {
  return getFun('/trade-web/api/user/current')
}
/* actions */
export default {
  /* 获取用户信息 */
  async getUserInfo(ctx) {
    return fetchUserInfo().then(response => {
      if (response.code === '200' || response.code === 200) {
        ctx.commit('setUserInfo', response.data)
      } else {
        ctx.commit('signOut')
      }
      return response
    })
  },
/*   async login(ctx, account) {
    return login(account).then(response => {
      if (response.code === 200) {
        ctx.commit('setUserInfo', response.data.userInfo)
        ctx.commit('setToken', response.data.token)
      }
    })
  } */
}