import axios from 'axios'
import router from '../router'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
import { tokenRefresh } from '@/api/user'
import { alertMsg } from '@/utils/alert' /* 消息提示*/
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000000, // request timeout
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    if (store.getters.token) {
      // 让每个请求携带token
      // ['Authorization'] 是自定义标题键
      // 请根据实际情况修改

      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果你想获得http信息，如报头或状态
   * 请 return  response => response
   */

  /**
   * 通过自定义代码确定请求状态
   * 你也可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data
    /*code*/
    const code = response.status
    // 如果自定义代码不是200，则判断为错误。
    if (code !== 200) {
      alertMsg('error', res.message || 'Error')
      if (code === 500) {
        // to re-login
        MessageBox.confirm('您已经退出，您可以取消停留在这个页面，或重新登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.code == 500) {
        alertMsg('error', res.message || 'Error')
        return Promise.reject(new Error(res.message || 'Error'))
      } else if (res.code == 400) {
        MessageBox.confirm(res.message, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        return res
      }
    }
  },
  error => {
    var res = error.response.data
    var code = error.response.status
    if (code == 400) {
      MessageBox.confirm(res.message, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (code == 406) {
      /**刷新token */
      store.dispatch('user/tokenRefresh').then(() => {
        location.reload()
      })
    } else if (code === 502 || code === '502') {
      router.replace({path: '/404', query: { error: res.message }})
    } else {
      alertMsg('error', res.message || 'Error')
      return Promise.reject(error)
    }
  }
)

export default service
