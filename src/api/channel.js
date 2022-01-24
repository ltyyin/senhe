/**
 * 频道相关请求模块
 */
import { request } from '@/utils/request'

/**
 * 获取用户频道列表
 */
export const getUserChannels = userID => {
  return request({
    method: 'GET',
    url: `/channels/${userID}`,
  })
}

// 获取所用的频道列表
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/channels',
  })
}

// 添加一个新用户频道
export const addUserChannel = data => {
  return request({
    method: 'POST',
    url: '/channels',
    data,
  })
}

// 删除一个用户频道
export const deleteUserChannel = data => {
  return request({
    method: 'DELETE',
    url: `/channels/${data.channelID}`,
    data,
  })
}
