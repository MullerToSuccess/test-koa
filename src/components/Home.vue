<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
    <el-table-column prop="password" label="密码"></el-table-column>
  </el-table>
</template>

<script>
import common from "../axios/api";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      common.getUsers().then(res => {
        this.tableData = res.data
      });
    }
  }
};
</script>