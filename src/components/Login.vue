<template>
  <div class="loginHome">
    <table style="width: 100%">
      <tr>
        <!-- 登录 -->
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
                  <el-button type="primary" @click="login">登录</el-button>
                  <el-button type="primary" @click="signin">注册</el-button>
                </td>
              </tr>
            </table>
          </form>
        </td>
      </tr>
    </table>
  </div>
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
    login() {
      let formObj = {};
      formObj.name = loginForm.name.value;
      formObj.password = loginForm.password.value;
      common.login(formObj).then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userinfo", JSON.stringify(res.data.user));
        this.$router.push("/home"); // 首页跳转
      });
    },
    signin() {
      this.$router.push("/sign"); // 注册跳转
    }
  }
};
</script>
<style scoped lang='scss'>
.loginHome {
      margin: auto;
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
  // background: url("https://avatars3.githubusercontent.com/u/18322127?s=460&v=4");
}
</style>

