<template>
  <el-dialog @close="close" :title="title" :visible.sync="dialogVisible" width="50%">
    <el-form :model="addOrEditForm" ref="addOrEditForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="name"
        label="用户名"
        :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ]"
      >
        <el-input v-model="addOrEditForm.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
        :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]"
      >
        <el-input v-model="addOrEditForm.password"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="addOrEditForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addOrEditForm')">提交</el-button>
        <el-button @click="close()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import common from "../axios/api";
export default {
  name: "AddUserDialog",
  data() {
    return {};
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    title: String,
    addOrEditForm: {
      type: Object,
      default: {
        email: "",
        name: "",
        password: ""
      }
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("save", this.addOrEditForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭
    close() {
      this.$emit("close");
    }
  }
};
</script>