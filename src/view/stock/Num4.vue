<template>
  <div class="block">
    <span class="demonstration">id</span>
    <input v-model="input" placeholder="Please input" width="180"/>
    <span class="demonstration">日期</span>
    <el-date-picker v-model="dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
    </el-date-picker>
    <el-button @click="getAllStockInfo">查询</el-button>
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
const dateStr = ref(moment(new Date()).format("YYYY-MM-DD"))

onMounted(()=>{
  input.value=router.currentRoute.value.query.erb
  // input.value=this.$router.query.erb==null?'':this.$router.query.erb
})
onBeforeMount(()=>{
  input.value=''
})
function getAllStockInfo() {
  if(input.value==null || input.value.length==0){
    input.value='1481302460344696832'
  }
  axios.post("river/api/stockTemplate/getQuery",{
    id:input.value,
    dateStr:dateStr.value
  }).then((res) => {
  getMsg.value=res
  });
}

</script>
