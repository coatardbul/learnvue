<template>
  <div  STYLE="width: 400px">
    <el-form :model="userInfo"  >
      <el-form-item>
        <h1>登陆界面</h1>
      </el-form-item>
      <el-form-item label="登陆虚拟账号：" >
        <el-input type="text" @blur="blurRequest" v-model="userInfo.id"/>
      </el-form-item>
      <el-form-item label="验证码：">
        <el-input type="text" v-model="userInfo.identifyCode"/>
        <img id="imgValidCode" @click="initVerifyCodeUrl" title="看不清，换一张" alt="加载中" :src="verifyUrl" style="height:28px;">
      </el-form-item>
      <el-radio-group v-model="userInfo.duration">
        <el-radio :label="15">15分钟</el-radio>
        <el-radio :label="30">30分钟</el-radio>
        <el-radio :label="1800">3小时</el-radio>
      </el-radio-group>
      <el-form-item >
        <el-button type="primary" @click.prevent="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  setup>

import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

const userInfo=reactive({})


const randomNum=ref()
const verifyUrl=ref()


function initVerifyCodeUrl(){
  randomNum.value=Math.random();
  verifyUrl.value='https://jywg.18.cn/Login/YZM?randNum='+randomNum.value;
}


function  blurRequest(){
  axios.post(AxiosUrl.stock.tradeUser.baseInfo, {
    id: userInfo.id,
  }).then((res) => {
    Object.assign(userInfo,res);
    userInfo.password=encryptPassword(userInfo.password);
  });

}
function  encryptPassword(password){
  var pubkey = "-----BEGIN PUBLIC KEY-----\n" + "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHdsyxT66pDG4p73yope7jxA92\n" + "c0AT4qIJ/xtbBcHkFPK77upnsfDTJiVEuQDH+MiMeb+XhCLNKZGp0yaUU6GlxZdp\n" + "+nLW8b7Kmijr3iepaDhcbVTsYBWchaWUXauj9Lrhz58/6AE/NF0aMolxIGpsi+ST\n" + "2hSHPu3GSXMdhPCkWQIDAQAB\n" + "-----END PUBLIC KEY-----";
  var jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(pubkey);
 return  jsEncrypt.encrypt(password)
}


function  login(){
  userInfo.randNumber=randomNum.value;
  axios.post(AxiosUrl.stock.tradeUser.login, userInfo).then((res) => {
  });
}


onMounted(()=>{
  initVerifyCodeUrl();
})
</script>

<style scoped>

</style>
