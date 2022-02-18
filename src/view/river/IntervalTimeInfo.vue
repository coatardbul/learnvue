<template>
  <div class="demo-input-size">
    <span class="demonstration"
    >时间间隔</span
    >
    <input v-model="intervalNum" type="number" height="50" width="400"/>
    <el-button @click="getIntervalList">查询</el-button>
    <el-button @click="refreash">刷新间隔</el-button>
  </div>

  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column fixed type="index" width="50"/>
    <el-table-column label="时间" width="500">
      <template #default="scope">
        <span>{{ scope.row }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import {ref, reactive, onMounted} from "vue";
import axios from "axios";
import  AxiosUrl from '/src/constant/AxiosUrl'
import router from "@/config/router";

const tableData = reactive([])

onMounted(()=>{
  intervalNum.value=router.currentRoute.value.query.erb
})
const intervalNum=ref()

function refreash() {
  if(intervalNum.value>0){
    axios.post(AxiosUrl.river.intervalTime.refresh, {
      intervalType: intervalNum.value
    }).then((res) => {
      res.forEach(v => {
        tableData.push(v);
      })
    });
  }
}


function getIntervalList() {
  if(intervalNum.value>0){
    tableData.length=0
    axios.post(AxiosUrl.river.intervalTime.getTimeList, {
      intervalType: intervalNum.value
    }).then((res) => {
      res.forEach(v => {
        tableData.push(v);
      })
    });
  }
}
</script>
