import request from '@/utils/request'
import request1 from '@/utils/request copy'

export function login(data) {
  return request1({
    url: '/trade-admin/api/passwordLogin', // url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/baas-admin/user/info',
    method: 'get',
    headers: { 'Authorization': token }, // 这个地方是因为我需要给http请求协议加上一个请求头
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/trade-admin/api/logout',
    method: 'get'
  })
}
/** 获取验证码 */
export function captcha() {
  return request({
    url: '/trade-admin/api/captcha',
    method: 'get'
  })
}
// // ukey 登录
// export function ukeyLogin(data) {
//   return request({
//     url: '/baas-admin/api/usbKeyBinding/login',
//     method: 'post', data
//   })
// }
/** 令牌服务 */
export function tokenRefresh(data) {
  return request({
    url: '/trade-admin/api/auth/refresh/token',
    method: 'post',
    data
  })
}
/** 获取导航 */
export function getAuthMenu(data) {
  return request({
    url: '/trade-admin/api/menu/listbyuserid',
    method: 'post',
    data
  })
}
// export function getAuthMenu(data) {
//   return request({
//     url: '/trade-admin/api/menu/listMenuButtonByRoleId',
//     method: 'get',
//     data
//   })
// }
