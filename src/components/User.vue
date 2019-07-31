<template>
  <div class="user">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="userPanel" style="text-align:right">
          <span style="font-size: 20px;margin-right: 20px">{{ userInfo.name }}</span>
          <el-avatar :src="userInfo.imgUrl"></el-avatar>
          <!-- <el-button size="mini" @click="logout" type="danger" round>退出登录</el-button> -->
        </div>
      </el-header>
      <el-main>
        <div style="text-align: left">
          <el-button size="mini" @click="addUser" type="primary">添加</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;">
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
      </el-main>
    </el-container>
    <AddUserDialog
      :title="title"
      @save="saveUser"
      @close="closeAdd"
      :dialogVisible="dialogVisible"
      :addOrEditForm="addOrEditForm"
    />
    <router-view />
  </div>
</template>
<script>
import common from "../axios/api";
import AddUserDialog from "@/components/AddUserDialog";
export default {
  name: "User",
  data() {
    return {
      tableData: [],
      userInfo: JSON.parse(localStorage.getItem("userinfo")),
      dialogVisible: false,
      title: "添加用户",
      addOrEditForm: {
        userId: "",
        email: "",
        name: "",
        password: ""
      }
    };
  },
  components: {
    AddUserDialog
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
    addUser() {
      this.title = "添加用户";
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.title = "编辑用户";
      this.addOrEditForm = {
        userId: row.userId,
        email: row.email,
        name: row.name,
        password: row.password
      };
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = {
            userId: row.userId
          };
          common.deleteUser(params).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUsers();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    closeAdd() {
      this.dialogVisible = false;
    },
    saveUser(form) {
      this.dialogVisible = false;
      // 判断是新增还是编辑
      if (this.title == "添加用户") {
        common.saveUser(form).then(res => {
          this.getUsers();
        });
      } else {
        common.updateUser(form).then(res => {
          this.getUsers();
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
    width: 100%;
    height: 100%;
}
</style>

