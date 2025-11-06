import request from '@/utils/request'

export function categoryList(params) {
  return request({
    url: '/api/category/list',
    method: 'get',
    params
  })
}
