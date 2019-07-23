import axios from "./axios"

/* 公用接口： 登录等 */
let apis = {
  login: "/login/login", // 登录
  sign: "/login/sign", // 注册
  getUsers: "/users/getUser", // 获取用户列表
  saveUser: "/users/saveUser", // 添加用户
  updateUser: '/users/updateUser', // 更新用户信息
  deleteUser: '/users/deleteUser', // 删除用户
}

let common = {}

common.login = async params => {
  return await axios.post(apis.login, params, { auth: false })
}

common.sign = async params => {
  return await axios.post(apis.sign, params, { auth: false })
}

common.getUsers = async params => {
  return await axios.post(apis.getUsers, params, { auth: false })
}

common.saveUser = async params => {
  return await axios.post(apis.saveUser, params, { auth: false })
}

common.updateUser = async params => {
  return await axios.post(apis.updateUser, params, { auth: false })
}

common.deleteUser = async params => {
  return await axios.post(apis.deleteUser, params, { auth: false })
}
export default common
