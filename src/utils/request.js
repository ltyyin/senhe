import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_URL,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器

export { request }
