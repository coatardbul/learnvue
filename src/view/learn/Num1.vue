<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="列总数">
      <el-input v-model.number="cronTimeNum" type="number" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="openCron">启动定时器</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="closeCron">关闭定时器</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import {getCurrentInstance, mixin, onMounted, onUpdated, reactive, ref} from "vue";
import ConfigInfo from "@/constant/ConfigInfo";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

const hexinList=reactive([])
const cronTimeNum = ref(5000)

const timeRef=ref({})


function openCron(){
  timeRef.value=window.setInterval(() => {
    const {ss}=getCurrentInstance();
  }, 1000)}
function closeCron(){
  window.clearInterval(timeRef.value);
}

</script>

<style scoped>

</style>
