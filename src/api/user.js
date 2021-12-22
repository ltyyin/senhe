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

export const sendToken = token => {
  return request({
    method: 'POST',
    url: '/user/verifyToken',
    headers: { Authorization: token },
  })
}

export const verifyCode = code => {
  return request({
    method: 'POST',
    url: '/user/verifyCode',
    data: code,
  })
}

export const login = info => {
  return request({
    method: 'POST',
    url: '/auth/login',
    data: info,
  })
}
