<template>
  <MinuteUpDownNumFormLine
      ref="queryRef"
      @query="getIntervalStatic"
      @refresh="refreshMinuterDate"
      @supplement-refresh="supplementRefreshMinuterDate"
      @time-refresh="refreshTimeMinuterDate"
      @filter-date="filterDate"
      @redis-refresh="redisRefresh"
      @test-redis-data="testRedisData"
  ></MinuteUpDownNumFormLine>

  <MintureEmotionStatistic v-if="queryParam.objectSign=='minute_emotion_statistic'"
                           :query-param="queryParam"
                           :char-style="charStypeUpDown"
                           :key="time"
  ></MintureEmotionStatistic>
  <MintureUpDownNumStatistic v-else
                             :query-param="queryParam"
                             :char-style="charStypeUpDown"
                             :key="time">
  </MintureUpDownNumStatistic>

</template>

<script setup>
import {onMounted, ref} from "vue";
import AxiosUrl from '/src/constant/AxiosUrl'
import axios from "axios";
import {ElMessage} from 'element-plus'
import ConfigInfo from '/src/constant/ConfigInfo'
import EmotionFormLine from './EmotionMinuteFormLine'
import MintureEmotionStatistic from "@/view/stock/MintureEmotionStatistic";
import MintureUpDownNumStatistic from '@/view/stock/MintureUpDownNumStatistic'
import MinuteUpDownNumFormLine from '@/view/stock/MinuteUpDownNumFormLine'

const charStypeUpDown = {width: '100%', height: '700px'};
const time = ref()

const queryRef = ref()
const queryParam = ref({
  dateStr: '',
  objectSign: '',
})

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
  queryParam.value = queryParamTemp;
  time.value = new Date().getTime();
}

function refreshMinuterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.forceRefreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then();
}

function filterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.filterDate, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
  }).then();
}

function refreshTimeMinuterDate(queryParam) {
  if (queryParam == null || queryParam.timeStr == null) {
    ElMessage.error('时间不能为空')
    return;
  }
  axios.post(AxiosUrl.stock.stockMinuteStatic.refreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeStr: queryParam.timeStr
  }).then();
}
function redisRefresh(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.quickRefreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then();
}

function testRedisData(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.quickSaveRedisData, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
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
  queryParam.value = queryRef.value.queryParam
})
</script>

<style scoped>
.chart-minuter-emotion {
  width: 50%;
  display: inline-block;
}
</style>
