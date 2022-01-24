/**
 * 用户相关的请求模块
 */
import { request } from '@/utils/request'

/**
 * 用户登录
 */
export const sendSms = data => {
  return request({
    method: 'GET',
    url: '/auth/sendSms',
  })
}

export const login = info => {
  return request({
    method: 'POST',
    url: '/auth/login',
    data: info,
  })
}

/* 需要token验证，获取登录用户信息 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/auth/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.loginModel.user.token}`,
    // },
  })
}

/* 验证码登录后获取token */
export const fetchToken = data => {
  return request({
    method: 'POST',
    url: '/auth/token',
    data,
  })
}

/* 短信验证码注册用户 */
export const verifyCodeRegister = data => {
  return request({
    method: 'POST',
    url: '/users/register',
    data,
  })
}
