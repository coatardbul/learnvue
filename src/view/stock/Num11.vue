<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
                   @query="getIntervalStatic"
                   @refresh="refreshMinuterDate"
                   @supplement-refresh="supplementRefreshMinuterDate"
                   @time-refresh="refreshTimeMinuterDate"
                  @filter-date="filterDate"
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
import { ElMessage } from 'element-plus'
import ConfigInfo from '/src/constant/ConfigInfo'
import EmotionFormLine from './EmotionMinuteFormLine'
import BaseMintureStatistic from "@/view/stock/BaseMintureStatistic";

const charStypeUpDown={width: '100%', height: '700px'};
const time =ref()
const showInfo=ref({
  tradeButton: true,
  baseButton: true,
  forceRefreshButton: true,
  timeInterval:true,
  timeStr:true,
  forceRefreshName: '强制刷新',
  supplementRefreshButton:true,
  supplementRefreshName:'补充刷新',
  refreshTimeButton:true,
  timeRefreshName:"强制更新时间点",
  filterDateButton:true,
  filterDateName:"过滤数据",
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
  axios.post(AxiosUrl.stock.stockMinuteStatic.forceRefreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign:  ConfigInfo.emotionInfo.defaultMinuterObjectSign ,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then();
}

function filterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.filterDate, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign:  ConfigInfo.emotionInfo.defaultMinuterObjectSign ,
  }).then();
}

function refreshTimeMinuterDate(queryParam) {
  if(queryParam == null || queryParam.timeStr == null){
    ElMessage.error('时间不能为空')
    return;
  }
  axios.post(AxiosUrl.stock.stockMinuteStatic.refreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign:  ConfigInfo.emotionInfo.defaultMinuterObjectSign ,
    timeStr:  queryParam.timeStr
  }).then();
}




function supplementRefreshMinuterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.supplementRefreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign:  ConfigInfo.emotionInfo.defaultMinuterObjectSign ,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then();
}




function clearDate() {
  xDataArray.value.length = 0
  series.value.length = 0

}

onMounted(() => {
  queryParam.value=queryRef.value.queryParam
})
</script>

<style scoped>
.chart-minuter-emotion {
  width: 50%;
  display: inline-block;
}
</style>
