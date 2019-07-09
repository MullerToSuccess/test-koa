import axios from "./axios"

/* 公用接口： 登录等 */
let apis = {
  login: "/login/login", // 登录
  sign: "/login/sign", // 注册
  getUsers: "/users/getUser" // 获取用户列表
}

let common = {}

common.login = async params => {
  return await axios.post(apis.login, params, { auth: true })
}

common.sign = async params => {
  return await axios.post(apis.sign, params, { auth: false })
}

common.getUsers = async params => {
  return await axios.post(apis.getUsers, params, { auth: false })
}

export default common
