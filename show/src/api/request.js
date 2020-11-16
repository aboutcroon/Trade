import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import { getSaveToken } from './token.js'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000000, // 请求超时
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getSaveToken(process.env.VUE_APP_TOKENNAME)
    // 在发送请求前添加header头
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // 处理请求错误
    return error
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const response = error.response
    const code = response.data && response.data.code
    const status = code ? code : response.status
    if (status === '401' || status === 401) {
      repeatLogin(response.data)
    }
    return error
  }
)

function repeatLogin(data) {
    const isMessage =  data && data.message ? data.message: '账号在其他地方登录，请重新登录！'
    MessageBox.alert(isMessage, '重新登陆', {
      customClass: 'signout-message',
      confirmButtonText: '确定',
      type: 'error',
      showClose: false,
      closeOnClickModal: false
    }).then(() => {
      store.commit('signOut')
      location.reload()
    })
}

export default service