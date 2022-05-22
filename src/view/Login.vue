<template>
  <div  class="login-container">
    <el-form  class="login-form"  >
      <el-form-item>
        <h1>登陆界面</h1>
      </el-form-item>
      <el-form-item label="用户：" >
        <el-input type="text" v-model="username"/>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="password" v-model="password"/>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click.prevent="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      axios.post(AxiosUrl.river.user.login, {
        account: this.username,
        password: this.password,
      }).then((res) => {
        localStorage.setItem("username", this.username);
        localStorage.setItem("token", res);
        this.$router.push("/");
      });

    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100%;
  background-color: #e1e7ee;
  text-align: center;



  .title-container {

    .title {
      font-size: 22px;
      color: #eee;
      margin: 0 auto 25px auto;
      text-align: center;
      font-weight: bold;
    }

  }
}
.login-form {
  margin-left: 40%;

  width: 360px;
  align-items: center;
}
</style>
