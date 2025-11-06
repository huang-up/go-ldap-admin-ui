import request from '@/utils/request'

export function itemList(params) {
  return request({
    url: '/api/item/list',
    method: 'get',
    params
  })
}
