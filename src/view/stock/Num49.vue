<template>
  <div  STYLE="width: 400px">
    <el-form :model="userInfo"  >
      <el-form-item>
        <h1>cookie更新</h1>
      </el-form-item>
      <el-form-item label="登陆虚拟账号：" >
        <el-input type="text" v-model="userInfo.id"/>
      </el-form-item>
      <el-form-item label="cookie：">
        <el-input   type="textarea" v-model="userInfo.cookie"/>
      </el-form-item>
      <el-form-item label="validatekey：">
        <el-input   type="textarea" v-model="userInfo.validatekey"/>
      </el-form-item>
      <el-radio-group v-model="userInfo.duration">
        <el-radio :label="15">15分钟</el-radio>
        <el-radio :label="30">30分钟</el-radio>
        <el-radio :label="1800">3小时</el-radio>
      </el-radio-group>
      <el-form-item >
        <el-button type="primary" @click.prevent="updateCookie">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  setup>

import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

const userInfo=reactive({})







function  updateCookie(){
  axios.post(AxiosUrl.stock.tradeUser.updateCookie, userInfo).then((res) => {

  });
}


onMounted(()=>{
})
</script>

<style scoped>

</style>
