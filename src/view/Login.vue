<template>
  <h1>登陆界面</h1>
  <form @submit.prevent="login">
    <div>
      <label>用户名：</label>
      <input type="text" v-model="username">
    </div>
    <div>
      <label>密码：</label>
      <input type="password" v-model="password">
    </div>
    <button>登陆</button>
  </form>
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
        password:this.password,
      }).then((res) => {
          this.$router.push("/");
        localStorage.setItem("username",this.username);
        localStorage.setItem("token",res);
      });
      // if ("admin" === this.username && "123456" === this.password) {
      //   this.$router.push("/");
      //   localStorage.setItem("token","123456");
      // }else {
      //   alert("用户名密码错误");
      // }
    }
  }
}
</script>
