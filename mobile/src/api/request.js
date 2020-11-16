import axios from 'axios'

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
    return error
  }
)

export default service