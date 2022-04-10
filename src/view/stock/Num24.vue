<template>
  <EmotionMinuteFormLine ref="dayRangeToolbar"
                      :show-info="showInfo"
                         @refresh="refresh"
                         @supplement-refresh="deleteInfo"
                         @query="getDayStatic"></EmotionMinuteFormLine>
  <div  style="width: 90%;">
    <BaseScatterLogEcharts  :char-style="charStypeMedian"
                         :key="time"
                            :query-param="queryParam"
    ></BaseScatterLogEcharts>
  </div>

</template>

<script setup>
import EmotionMinuteFormLine from './EmotionMinuteFormLine'
import BaseScatterLogEcharts from './BaseScatterLogEcharts'


import {onMounted, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
const time =ref()
const queryParam=ref({})
const dayRangeToolbar=ref({})
const charStypeMedian={width: '100%', height: '800px'};
const showInfo=ref({
  tradeButton: true,
  baseButton: true,
  objectSign:false,
  timeInterval:true,
  forceRefreshButton: true,
  forceRefreshName:'强制历史模拟',
  supplementRefreshButton:true,
  supplementRefreshName:'删除当日数据',
})

function getDayStatic(queryParamTemp){
  queryParam.value=queryParamTemp;
  time.value=new Date().getTime()
}
function refresh(){
  axios.post(AxiosUrl.stock.stockWatch.hisSimulate, {
    dateStr: dayRangeToolbar.value.queryParam.dateStr,
    timeInterval:dayRangeToolbar.value.queryParam.timeInterval,
  }).then()
}

function deleteInfo(){
  axios.post(AxiosUrl.stock.stockWarnLog.delete, {
    dateStr: dayRangeToolbar.value.queryParam.dateStr,
  }).then()
}

onMounted(()=>{
})

</script>

<style scoped>

</style>
