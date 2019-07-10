<template>
  <div>
    <div style="text-align:right">
      {{ userInfo.name }}
      <el-avatar :src="userInfo.imgUrl"></el-avatar>
      <el-button @click="logout" type="danger" round>退出登录</el-button>
    </div>
    <div>
      <el-button @click="addUser" type="primary" disabled>添加</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import common from "../axios/api";
export default {
  data() {
    return {
      tableData: [],
      userInfo: JSON.parse(localStorage.getItem("userinfo"))
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      common.getUsers().then(res => {
        this.tableData = res.data;
      });
    },
    logout() {
      this.$router.push("/"); // 退回登录页
    },
    addUser() {},
    handleEdit(index, row) {
      console.log(row);
    },
    handleDelete(index, row) {}
  }
};
</script>