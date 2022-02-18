<template>

  <EmotionDayFormLine
      :show-refresh-date="true"
      @query-day-emotion="getDaylStatic"
  @refresh-date="updateDate"
      @force-refresh-date="forceUpdateDate"
  ></EmotionDayFormLine>

  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column label="id" width="200">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时间" width="200">
      <template #default="scope">
        <span>{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="对象标识" width="200">
      <template #default="scope">
        <span>{{ scope.row.objectSign }}</span>
      </template>
    </el-table-column>
    <el-table-column label="对象数据" width="500">
      <template #default="scope">
        <span>{{ scope.row.objectStaticArray }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="updateDayDetail(scope.row)"
        >更新当日数据</el-button
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
import EmotionDayFormLine from './EmotionDayFormLine'
import ConfigInfo from "@/constant/ConfigInfo";

const tableData = reactive([])
const queryParam = reactive({
  dateRangeArray: [],
  objectSign: '',
})

onMounted(() => {
  getDaylStatic(queryParam);
})


function updateDayDetail(row){
  axios.post(AxiosUrl.stock.stockDayStatic.refreshDay, {
    dateStr: row.date,
    objectEnumSign:row.objectSign,
  }).then();
}

function forceUpdateDate(queryParam){

  axios.post(AxiosUrl.stock.stockDayStatic.forceRefreshDayRange, {
    beginDate: queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[0]:ConfigInfo.getDayStr(queryParam.dateRangeArray[0]),
    endDate:queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[1]:ConfigInfo.getDayStr(queryParam.dateRangeArray[1]),
    objectEnumSign:queryParam==null||queryParam.objectSign.length==0?ConfigInfo.emotionInfo.defaultDayObjectSign:queryParam.objectSign,
  }).then();
}


function updateDate(queryParam){

  axios.post(AxiosUrl.stock.stockDayStatic.refreshDayRange, {
    beginDate: queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[0]:ConfigInfo.getDayStr(queryParam.dateRangeArray[0]),
    endDate:queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[1]:ConfigInfo.getDayStr(queryParam.dateRangeArray[1]),
    objectEnumSign:queryParam==null||queryParam.objectSign.length==0?ConfigInfo.emotionInfo.defaultDayObjectSign:queryParam.objectSign,
  }).then();
}

function getDaylStatic(queryParam) {
  tableData.length=0
  axios.post(AxiosUrl.stock.stockDayStatic.getRangeStatic, {
    beginDateStr: queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[0]:ConfigInfo.getDayStr(queryParam.dateRangeArray[0]),
    endDateStr:queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[1]:ConfigInfo.getDayStr(queryParam.dateRangeArray[1]),
    objectEnumSign:queryParam==null||queryParam.objectSign.length==0?ConfigInfo.emotionInfo.defaultDayObjectSign:queryParam.objectSign,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

</script>
