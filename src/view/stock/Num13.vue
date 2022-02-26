<template>

<EmotionFormLine :is-show="false" @query="getIntervalStatic"></EmotionFormLine>

  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column label="时间" width="180">
      <template #default="scope">
        <router-link :to="{path:'/intervalTime',query:{erb:scope.row.date}}">{{ scope.row.date }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="对象标识" width="200">
      <template #default="scope">
        <span>{{ scope.row.objectSign }}</span>
      </template>
    </el-table-column>
    <el-table-column label="间隔分钟" width="200">
      <template #default="scope">
        <span>{{ scope.row.timeInterval }}</span>
      </template>
    </el-table-column>
    <el-table-column label="间隔分钟数总数" width="200">
      <template #default="scope">
        <span>{{ scope.row.timeIntervalCount }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="updateDayDetail(scope.row)"
        >补充更新</el-button
        >
        <!--        <el-button type="text" size="small">Edit</el-button>-->
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import axios from 'axios';
import AxiosUrl from '/src/constant/AxiosUrl'
import {onMounted, reactive} from 'vue'
import EmotionFormLine from './EmotionMinuteFormLine'

const tableData = reactive([])
const queryParam = reactive({
  dateStr: '',
  objectSign: '',
  intervalNum: null
})

onMounted(() => {
  getIntervalStatic(queryParam);
})

function reset(){
  queryParam.intervalNum=null
  queryParam.objectSign=null
  queryParam.dateStr=null
}
function updateDayDetail(rowInfo){
  axios.post(AxiosUrl.stock.stockMinuteStatic.supplementRefreshDay, {
    dateStr: rowInfo.date,
    objectEnumSign:rowInfo.objectSign,
    timeInterval:rowInfo.timeInterval
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

function getIntervalStatic(queryParam) {
  tableData.length=0
  axios.post(AxiosUrl.stock.stockMinuteStatic.getRangeStatic, {
    dateStr: queryParam.dateStr,
    objectEnumSign:queryParam.objectSign,
    timeInterval:queryParam.intervalNum
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

</script>
