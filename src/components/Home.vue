<template>
  <el-container style="height: 100%;  border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="1" :route="{path:'/user'}">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{path:'/book'}">
          <i class="el-icon-document"></i>
          <span slot="title">图书管理</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{path:'/home'}">
          <i class="el-icon-setting"></i>
          <span slot="title">waiting</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
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
  mounted() {
    // this.getUsers();
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
.userPanel {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

