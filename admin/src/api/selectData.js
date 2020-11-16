import request from '@/utils/request'

/** 获取导航 */
export function dictFun(params) {
  return request({
    url: '/trade-admin/api/dict',
    method: 'get',
    params
  })
}
