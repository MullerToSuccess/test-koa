import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Sign from "@/components/Sign"
import Home from "@/components/Home"
import Book from "@/components/Book"
import User from "@/components/User"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },

    {
      path: "/sign",
      name: "Sign",
      component: Sign
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/user",
          name: "User",
          component: User
        },
        {
          path: "/book",
          name: "Book",
          component: Book
        }
      ]
    }
  ]
})
