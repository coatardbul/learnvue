<template>
  <EmotionMinuteFormLine ref="dayRangeToolbar"
                      :show-info="showInfo"
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
const dayRangeToolbar=ref(null)
const charStypeMedian={width: '100%', height: '800px'};
const showInfo=ref({
  tradeButton: true,
  baseButton: true,
  forceRefreshButton: false,
  objectSign:false,
  timeInterval:false,
  supplementRefreshButton:false,
})

function getDayStatic(queryParamTemp){
  queryParam.value=queryParamTemp;
  time.value=new Date().getTime()

}

onMounted(()=>{
})

</script>

<style scoped>

</style>
