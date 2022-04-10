<template>
  <EmotionDayFormLine ref="dayRangeToolbar"
                      :show-info="showInfo"
                      @supplement-refresh="updateDate"
                      @refresh="forceUpdateDate"
                      @query="getDayStatic"></EmotionDayFormLine>
  <div  style="width: 90%;">
      <BaseScatterGridEcharts  :char-style="charStypeMedian"
                               :key="time"
                               :begin-date="beginDate"
                               :end-date="endDate"
      ></BaseScatterGridEcharts>
  </div>

</template>

<script setup>
import EmotionDayFormLine from './EmotionDayFormLine'
import BaseScatterGridEcharts from './BaseScatterGridEcharts'


import {onMounted, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
const time =ref()
const beginDate=ref()
const endDate=ref()
const dayRangeToolbar=ref(null)
const charStypeMedian={width: '100%', height: '1000px'};
const showInfo=ref({
  tradeButton: true,
  baseButton: true,
  forceRefreshButton: true,
  objectSign:true,
  timeInterval:true,
  forceRefreshName: '强制刷新',
  supplementRefreshButton:true,
  supplementRefreshName:'补充刷新',
})

function getDayStatic(){

  if(dayRangeToolbar.value.queryParam.dateRangeArray){
    beginDate.value=dayRangeToolbar.value.queryParam.dateRangeArray[0]
    endDate.value=dayRangeToolbar.value.queryParam.dateRangeArray[1]
  }else {
    beginDate.value='2022-01-01'
    endDate.value='2022-12-01'
  }
  time.value=new Date().getTime()

}

function forceUpdateDate(queryParam){

  axios.post(AxiosUrl.stock.scatterStatic.forceRefreshDayRange, {
    beginDate: queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[0]:queryParam.dateRangeArray[0],
    endDate:queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[1]:queryParam.dateRangeArray[1],
    objectEnumSign: 'day_market_Value_statistic'
  }).then();
}


function updateDate(queryParam){

  axios.post(AxiosUrl.stock.scatterStatic.refreshDayRange, {
    beginDate: queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[0]:queryParam.dateRangeArray[0],
    endDate:queryParam==null||queryParam.dateRangeArray.length==0?ConfigInfo.dateUtil.rangeDateArray[1]:queryParam.dateRangeArray[1],
    objectEnumSign: 'day_market_Value_statistic'
  }).then();
}

onMounted(()=>{
  dayRangeToolbar.value.queryParam.objectEnumSign='day_market_Value_statistic';
})

</script>

<style scoped>

</style>
