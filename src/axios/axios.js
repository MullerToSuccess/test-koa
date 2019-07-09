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
    return data.data
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
        ? (options["headers"]["authorization"] = token)
        : (options["headers"]["token"] = token)
      Object.assign(options.headers, headers)
      Object.assign(send.headers, options.headers)
    }
    return axios(send).then(res => {
      return formatResponse(res)
    })
  },
  post(url, params, options) {
    let send = {
      method: "post",
      url: baseUrl + url,
      params,
      headers: {}
    }
    // token
    let token = localStorage.getItem("token") ? localStorage.getItem("token") : ""
    if (token) {
      let headers = options.headers
      options["headers"] = {}
      options.auth
        ? (options["headers"]["authorization"] = token)
        : (options["headers"]["token"] = token)
      Object.assign(options.headers, headers)
      Object.assign(send.headers, options.headers)
    }
    return axios(send).then(res => {
      return formatResponse(res)
    })
  }
}
