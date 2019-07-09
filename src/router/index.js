import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Sign from '@/components/Sign'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/sign",
      name: "Sign",
      component: Sign
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
  ]
})

