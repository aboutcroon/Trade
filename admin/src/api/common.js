import request from '@/utils/request'
/*表格*/
export function getList(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
/*post请求*/
export function postFun(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
/*post请求 (携带 header) */
export function postHeaderFun(url, data, headers) {
  return request({
    url: url,
    method: 'post',
    data,
    headers: headers
  })
}
/*get请求*/
export function getFun(url,params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
/*formData请求*/
export function formDataFun(url, params) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'  //multipart/form-data;boundary=--xxxxxxx   application/json
    },
    url: url,
    method: 'post',
    params
  })
}


