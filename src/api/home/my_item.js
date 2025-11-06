import request from '@/utils/request'

export function myItemAdd(params) {
  return request({
    url: '/api/myItem/add',
    method: 'post',
    params
  })
}
export function myItemDelete(params) {
  return request({
    url: '/api/myItem/delete',
    method: 'delete',
    params
  })
}
