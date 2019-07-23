import axios from "axios"
const baseUrl = "http://localhost:3010"

axios.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8"
    console.log("请求配置", config)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.defaults.timeout = 15000
axios.interceptors.response.use(
  data => {
    return data.data || data
  },
  error => {
    let response = { status: -404, statusText: "请检查网络或稍后重试" }
    response = error.response || response
    return Promise.reject(response)
  }
)
// 异常格式化
function formatResponse(response) {
  if (response) return response
  return {
    status: response.status,
    msg: response.statusText,
    data: response.data
  }
}
// 检测状态：
function checkStatus(data, options) {
  switch (data.code) {
    // 成功
    case "0":
      Vue.prototype.$message({
        message: data.message,
        type: "success"
      })
      break
    // 失败
    case "1":
      Vue.prototype.$message({
        message: data.message,
        type: "warning"
      })
      break
    // 无数据
    case "2":
      Vue.prototype.$message({
        message: data.message,
        type: "info"
      })
      break
    default:
      break
      // Vue.prototype.$message({
      //   message: data.message,
      //   type: "success"
      // })
  }
}

export default {
  get(url, params, options) {
    let send = {
      method: "get",
      url: baseUrl + url,
      params,
      headers: {}
    }
    // token
    let token = localStorage.getItem("token") || ""
    if (token) {
      let headers = options.headers
      options["headers"] = {}
      options.auth
        ? // ? (options["headers"]["authorization"] = token)
          (options["headers"]["token"] = token)
        : (options["headers"]["token"] = token)
      Object.assign(options.headers, headers)
      Object.assign(send.headers, options.headers)
    }
    return axios(send).then(res => {
      checkStatus(res, options)
      return formatResponse(res)
    })
  },
  post(url, data, options) {
    let send = {
      method: "post",
      url: baseUrl + url,
      data: data,
      headers: {}
    }
    // token
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : ""
    if (token) {
      let headers = options.headers
      options["headers"] = {}
      options.auth
        ? (options["headers"]["token"] = token)
        : (options["headers"]["token"] = token)
      Object.assign(options.headers, headers)
      Object.assign(send.headers, options.headers)
    }
    return axios(send).then(res => {
      checkStatus(res, options)
      return formatResponse(res)
    })
  }
}
