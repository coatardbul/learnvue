<template>
  <div class="block">
    <span class="demonstration">id</span>
    <input v-model="input" placeholder="Please input" width="180"/>
    <span class="demonstration">日期</span>
    <el-date-picker v-model="dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
    </el-date-picker>
    <span class="demonstration">时间</span>
    <input v-model="timeStr" placeholder="HH:mm" width="180"/>
    <span class="demonstration">股票代码</span>
    <input v-model="stockCode" placeholder="001001" width="180"/>
    <el-button @click="getAllStockQuery">查询</el-button>
    <el-button @click="getAllStockInfo">查询信息</el-button>

  </div>
  <el-link :href="'http://www.iwencai.com/unifiedwap/result?w='+getMsg+'&querytype=stock'" target="_blank">{{getMsg}}</el-link>
</template>
<script setup>
import axios from 'axios';
import {onBeforeMount, onMounted, ref} from 'vue'
import moment from "moment";
import router from "@/config/router";

const getMsg = ref('')
const input = ref('')
const timeStr = ref('')
const stockCode = ref('')

const dateStr = ref(moment(new Date()).format("YYYY-MM-DD"))

onMounted(()=>{
  input.value=router.currentRoute.value.query.erb
  // input.value=this.$router.query.erb==null?'':this.$router.query.erb
})
onBeforeMount(()=>{
  input.value=''
})
function getAllStockQuery() {
  if(input.value==null || input.value.length==0){
    input.value='1481302460344696832'
  }
  axios.post("river/api/stockTemplate/getQuery",{
    id:input.value,
    dateStr:dateStr.value,
    timeStr:timeStr.value,
    stockCode:stockCode.value,
  }).then((res) => {
  getMsg.value=res
  });
}
function getAllStockInfo() {
  if(input.value==null || input.value.length==0){
    input.value='1481302460344696832'
  }
  axios.post("/stock/stockQuery/strategy",{
    riverStockTemplateId:input.value,
    dateStr:dateStr.value,
    timeStr:timeStr.value,
    stockCode:stockCode.value,
  }).then((res) => {
    getMsg.value=res
  });
}


</script>
