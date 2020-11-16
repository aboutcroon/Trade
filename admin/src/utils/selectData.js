import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
// 状态
export function stateList() {
  return [
    {
      key: 1,
      value: '启用'
    },
    {
      key: 0,
      value: '禁用'
    }

  ]
}
/** 菜单类型 */
export function menuFlag() {
  return [
    {
      key: '1',
      value: '菜单'
    },
    {
      key: '2',
      value: '操作'
    }

  ]
}
// 菜单显示状态
export function hiddenList() {
  return [
    {
      key: true,
      value: '显示'
    },
    {
      key: false,
      value: '隐藏'
    }
  ]
}
/** 节点类型 */
export function nodeType() {
  getList('/trade-admin/api/worksProperty/pageList',
   {
    paras: {},
    pageSize: 10,
    pageNumber: 1,
  }).then(res=>{
    return res.data
  })
}
