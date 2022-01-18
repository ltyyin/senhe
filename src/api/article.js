/**
 * 文章相关请求模块
 */
import { request } from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/articles',
    params,
  })
}
