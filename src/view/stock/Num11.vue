<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
                   @query="getIntervalStatic"
                   @refresh="refreshMinuterDate"
                   @supplement-refresh="supplementRefreshMinuterDate"
                   @time-refresh="refreshTimeMinuterDate"
  ></EmotionFormLine>

  <BaseMintureStatistic
      :query-param="queryParam"
      :char-style="charStypeUpDown"
      :key="time"
  ></BaseMintureStatistic>

</template>

<script setup>
import { onMounted, ref} from "vue";
import AxiosUrl from '/src/constant/AxiosUrl'
import axios from "axios";

import ConfigInfo from '/src/constant/ConfigInfo'
import EmotionFormLine from './EmotionMinuteFormLine'
import BaseMintureStatistic from "@/view/stock/BaseMintureStatistic";

const charStypeUpDown={width: '100%', height: '5000px'};
const time =ref()
const showInfo=ref({
  tradeButton: true,
  baseButton: true,
  forceRefreshButton: true,
  objectSign:true,
  timeInterval:true,
  timeStr:true,
  forceRefreshName: '强制刷新',
  supplementRefreshButton:true,
  supplementRefreshName:'补充刷新',
  refreshTimeButton:true,
  timeRefreshName:"强制更新时间点",
})

const queryRef=ref()
const queryParam=ref()

const baseLineChart = ref()
const xAxis = ref({
  name: '时间',
  type: 'category',
})
const yAxis = ref([{
  type: 'value',
  name: '数值',
  position: 'left',
}, {
  type: 'value',
  name: '数值1',
  position: 'right',
}])


const legendSelectInfo = ref()
const xDataArray = ref([])
const series = ref([])
const hasXaxisEvent = ref(true)


function getIntervalStatic(queryParamTemp) {
  queryParam.value=queryParamTemp;
  time.value=new Date().getTime();
}

function refreshMinuterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.refreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then();
}
function refreshTimeMinuterDate(queryParam) {
  if(queryParam == null || queryParam.timeStr == null){
    alert("时间不能为空");
    return;
  }
  axios.post(AxiosUrl.stock.stockMinuteStatic.refreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeStr:  queryParam.timeStr
  }).then();
}




function supplementRefreshMinuterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.supplementRefreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then();
}




function clearDate() {
  xDataArray.value.length = 0
  series.value.length = 0

}

onMounted(() => {

  queryParam.value=queryRef.value.queryParam
  time.value=new Date();

})
</script>

<style scoped>
.chart-minuter-emotion {
  width: 50%;
  display: inline-block;
}
</style>
