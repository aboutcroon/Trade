import request from './request.js'

/* post请求 */
export function postFun(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
/* get请求 */
export function getFun(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
/* post发送文件 */
export function postFile(url, data) {
  return request({
    url: url,
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data
  })
}