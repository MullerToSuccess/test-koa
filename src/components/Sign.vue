<template>
  <table style="width: 100%">
    <tr>
      <!-- 注册 -->
      <td>
        <form name="loginForm">
          <table align="center">
            <tr>
              <td align="right">用户名:</td>
              <td align="right">
                <el-input v-model="name" name="name"></el-input>
              </td>
            </tr>
            <tr>
              <td align="right">密码:</td>
              <td align="right">
                <el-input v-model="password" name="password"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2" align="center">
                <el-button type="primary" @click="sign">注册</el-button>
                <el-button type="primary" @click="login">返回登录</el-button>
              </td>
            </tr>
          </table>
        </form>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import common from "@/axios/api.js";
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    sign() {
      let formObj = {};
      formObj.name = loginForm.name.value;
      formObj.password = loginForm.password.value;
      common.sign(formObj).then(res => {
          console.log(res)
        // localStorage.setItem("token", res.token);
        // localStorage.setItem("userinfo", res.user);
      });
    },
    login(){
      this.$router.push('/')  // 返回登录
    }
  }
};
</script>
