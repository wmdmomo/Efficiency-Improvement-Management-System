import request from './index'

export function getTodo(params){
  return request('/getTodo','get',params)
}
export function addTodo(list){
  return request('/addTodo','post',list)
}
export function getMoney(params){
  return request('/getMoney','get',params)
}
export function getFigure(params){
  return request('/getFigure','get',params)
}
export function addMoney(list){
  return request('/addMoney','post',list)
}