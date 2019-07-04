<template>
  <table>
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
      axios
        .post("http://localhost:3010/login", formObj)
        .then(function(res) {
            // 存储登录信息
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userinfo", res.data.data.user);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
