<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="cookie">
      <el-input v-model="form.cookie" autosize type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新cookie</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive} from 'vue'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

// do not use same name with ref
const form = reactive({
  cookie: '',
})

function onSubmit() {
  axios.post(AxiosUrl.stock.cookie.simpleModify, {
    cookie: form.cookie
  }).then();
}

</script>

<style scoped>

</style>
