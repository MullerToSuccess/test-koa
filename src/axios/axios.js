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
  response => {
    return response
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
function checkStatus(response, options) {
  console.log("check status", response)
  if (response.status == 200 || response.status == 304) {
    if (response.data.message == "success") {
    } else {
      Vue.prototype.$message({
        message: response.data.message,
        type: "warning"
      })
    }
    return
  } else {
    if (response.data.message == "success") {
    } else {
      Vue.prototype.$message({
        message: response.data.message,
        type: "warning"
      })
    }
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
      return formatResponse(res.data)
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
      return formatResponse(res.data)
    })
  }
}
