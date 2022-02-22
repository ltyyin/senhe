/**
 * 搜索相关请求模块
 */
import { request } from '@/utils/request'

//  根据关键词搜索文章
export const findArticles = params => {
  return request({
    method: 'GET',
    url: `/search/articles`,
    params,
  })
}

//  根据关键词搜索用户
export const findUsers = params => {
  return request({
    method: 'GET',
    url: `/search/users`,
    params,
  })
}

// 获取用户的搜索历史记录
export const fetchUserSearchHis = () => {
  return request({
    method: 'GET',
    url: '/search/histories',
  })
}

// 用户搜索历史的存储
// data:{ content:string }
export const userSearchHisStorage = data => {
  return request({
    method: 'POST',
    url: '/search/histories',
    data,
  })
}

// 删除指定的用户搜索历史记录
export const delUserSearchHisItem = record => {
  return request({
    method: 'DELETE',
    url: `/search/${record}`,
  })
}

// 删除所用用户搜索历史记录
export const delUserSearchHisAll = () => {
  return request({
    method: 'DELETE',
    url: '/search/all',
  })
}
