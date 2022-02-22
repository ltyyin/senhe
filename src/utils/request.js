import axios from 'axios'

/**
 * 在非组件模块中获取 store 必须通过这种方法
 * 这里单独加载 store 和在组件中 this.$store 是一个东西
 */
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://localhost:8080/webapi/api',
  // baseURL: 'http://4871o44a00.wicp.vip/api',
})

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么

    const { user } = store.state.loginModel

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    /* 处理完之后一定要把 config 返回，否则请求就会停在这里(相当于放行的标志) */
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器

export { request }
