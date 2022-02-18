<template>
  <div class="block">
<!--    <span class="demonstration">日期</span>-->
<!--    <el-date-picker v-model="dateStr" type="date" placeholder="Pick a day">-->
<!--    </el-date-picker>-->
<!--    <el-button @click="refreashDayInfo">查询当日数据</el-button>-->
  </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import moment from "moment";
import axios from "axios";
import router from "@/config/router";
const dateStr = ref(moment(new Date()).format("YYYY-MM-DD"))

</script>
