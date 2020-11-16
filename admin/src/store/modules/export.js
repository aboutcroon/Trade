var Mock = require('mockjs')
import { getList, postFun, getFun } from '@/api/common' /* 表格列表、post请求、get请求 */
Mock.mock('/api/load','get',[
  {
    value:1,
    label:'导出当前选择数据'
  },
  {
    value:2,
    label:'导出下方选择数据'
  },
  {
    value:3,
    label:'导出所有数据'
  }
])
const state = {
  worksId:'',
  show:false,
  worksStatus:'',
  str:'',
  mockName:Mock.mock({
    "array|1-10":[
      {
        'value|+1': 1,
        'label': '@FIRST',
      }
    ]}).array,
  exprotData:null
}
const mutations = {
  showExportBox: state => state.show = true,
  closeExportBox: state => state.show = false,
  assignment: (state,data) => state.exprotData = data,
  mockName: (state,data) => state.mockName = data,
  
  setWorksId: (state,data)=> {
    state.worksId = data
  },
  worksStatus: (state,data)=> {
    state.worksStatus = data
  },
  str: (state,data)=> {
    state.str = data
  }
}
const actions = {
  async async({ commit }) {
    const res = await getFun('/api/load')
    commit('assignment',res)
  },
  async competitionList({ commit }) {
    const {data} = await getFun('/trade-admin/api/competition/list')
    commit('mockName',data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}