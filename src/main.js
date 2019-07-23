// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "@/assets/global.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI) // 引用 element-ui 组件

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log('to:', to)
  console.log('from:', from)
  next()
  // if (to.meta.auth) {
  //   //权限判断
  //   if ("进行判断") {
  //     //读取token值
  //     //  成功
  //     next()
  //   } else {
  //     next({ path: "/" })
  //   }
  // } else {
  //   // 没有meta.auth 不用管
  //   next()
  // }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

window.Vue = Vue