<template>
  <div class="block">
    <span class="demonstration"
    >日期区间</span
    >
    <el-date-picker
        v-model="dateRangeArray"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
    >
    </el-date-picker>
    <el-button @click="getAllStockInfo">查询</el-button>

    <span width="60"></span>
    <span class="demonstration"
    >日期区间</span
    >
    <el-date-picker
        v-model="dateRangeRefreshArray"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
    >
    </el-date-picker>
    <el-button @click="refreshAllStockInfo">刷新数据</el-button>

  </div>

  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column fixed type="index" width="50"/>
    <el-table-column fixed label="日期" width="180">
      <template #default="scope">
        <router-link :to="{path:'/index2',query:{erb:scope.row.date}}">{{ scope.row.date }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="adjs" width="200">
      <template #default="scope">
        <span>{{ scope.row.adjs }}</span>
      </template>
    </el-table-column>
    <el-table-column label="涨停数量" width="200">
      <template #default="scope">
        <span>{{ scope.row.raiseLimitNum }}</span>
      </template>
    </el-table-column>
    <el-table-column label="标准差" width="200">
      <template #default="scope">
        <span>{{ scope.row.standardDeviation }}</span>
      </template>
    </el-table-column>
    <el-table-column label="中位数" width="200">
      <template #default="scope">
        <span>{{ scope.row.median }}</span>
      </template>
    </el-table-column>
    <el-table-column label="两板及以上涨停数量" width="200">
      <template #default="scope">
        <span>{{ scope.row.raiseLimitNumOne }}</span>
      </template>
    </el-table-column>
    <el-table-column label="两板及以上标准差" width="200">
      <template #default="scope">
        <span>{{ scope.row.standardDeviationOne }}</span>
      </template>
    </el-table-column>
    <el-table-column label="两板及以上中位数" width="200">
      <template #default="scope">
        <span>{{ scope.row.medianOne }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创业板涨停数量" width="200">
      <template #default="scope">
        <span>{{ scope.row.raiseLimitNumTwo }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创业板标准差" width="200">
      <template #default="scope">
        <span>{{ scope.row.standardDeviationTwo }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创业板中位数" width="200">
      <template #default="scope">
        <span>{{ scope.row.medianTwo }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="handleClick(scope.row)"
        >更新当日数据</el-button
        >
<!--        <el-button type="text" size="small">Edit</el-button>-->
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import {ref, reactive,onMounted} from "vue";
import axios from "axios";
import moment from "moment";
import AxiosUrl from "@/constant/AxiosUrl";

const tableData = reactive([])
const dateRangeRefreshArray=ref([])
const dateRangeArray = ref([
  new Date(2022, 0, 1, 10, 10),
  new Date(),
])
onMounted(() => {
  getAllStockInfo();
})

function handleClick(row){
  axios.post(AxiosUrl.stock.stockQuery.saveDate, {
    excelTemplateId: "1483051288928321536",
    dateBeginStr: row.date,
    dateEndStr: row.date
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}


function refreshAllStockInfo(){
  let beginDate = moment(dateRangeRefreshArray.value[0]).format("YYYY-MM-DD")
  let endDate = moment(dateRangeRefreshArray.value[1]).format("YYYY-MM-DD")
  axios.post(AxiosUrl.stock.stockQuery.saveDate, {
    excelTemplateId: "1483051288928321536",
    dateBeginStr: beginDate,
    dateEndStr: endDate
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}
function getAllStockInfo() {
  tableData.length=0
  let beginDate = moment(dateRangeArray.value[0]).format("YYYY-MM-DD")
  let endDate = moment(dateRangeArray.value[1]).format("YYYY-MM-DD")
  axios.post("stock/stockQuery/getAllStatic", {
    dateBeginStr: beginDate,
    dateEndStr: endDate
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}
</script>
