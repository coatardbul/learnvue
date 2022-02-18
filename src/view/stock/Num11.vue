<template>
  <EmotionFormLine :is-show="true"
                   @query-minuter-emotion="getIntervalStatic"
                   @refresh-minuter-emotion="refreshMinuterDate"
                   @supplement-refresh-minuter-emotion="supplementRefreshMinuterDate"
  ></EmotionFormLine>

  <BaseLineChart ref="baseLineChart" :x-axis="xAxis"
                 :y-axis="yAxis"
                 :x-data-array="xDataArray"
                 :series="series"
                 :has-xaxis-event="hasXaxisEvent"
                 :legend-select-info="legendSelectInfo"
                 v-if="xDataArray.length>0 && series.length>0"
  ></BaseLineChart>
</template>

<script setup>
import BaseLineChart from '/src/components/BaseLineChart'
import {getCurrentInstance, onBeforeMount, onMounted, onUpdated, ref} from "vue";
import AxiosUrl from '/src/constant/AxiosUrl'
import axios from "axios";
import moment from "moment";
import {reactive} from "vue";
import ConfigInfo from '/src/constant/ConfigInfo'
import EmotionFormLine from './EmotionMinuteFormLine'


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


function getIntervalStatic(queryParam) {
  clearDate()
  getMinuteStaticByDate(queryParam);
}

function refreshMinuterDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.refreshDay, {
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



//获取数据
function getMinuteStaticByDate(queryParam) {
  axios.post(AxiosUrl.stock.stockMinuteStatic.getDayDetail, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign: queryParam == null || queryParam.objectSign == null ? ConfigInfo.emotionInfo.defaultMinuterObjectSign : queryParam.objectSign,
    timeInterval: queryParam == null || queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : queryParam.timeInterval
  }).then((res) => {
    if (res == null) {
      return
    }
    if (res.dateTimeStrArray.length > 0) {
      res.dateTimeStrArray.forEach(v => {
        xDataArray.value.push(v)
      })
      res.ybaseInfo.forEach(c => {
        let ybaseInfo = {
          name: '',
          type: 'line',
          yAxisIndex: 0,
          data: []
        }
        ybaseInfo.name = c.name

        if (c.name === "主板炸板回封" || c.name == "主板涨停") {
          ybaseInfo.yAxisIndex = 1;
        } else {
          ybaseInfo.yAxisIndex = 0;
        }


        c.yaxiosInfo.forEach(v => {
          //判断横坐标中是否存在
          if (xDataArray.value.findIndex(t => {
            t === v.dateTimeStr
          })) {
            if (c.name.includes("主板跌停")) {
              ybaseInfo.data.push(0 - v.value)
            } else {
              ybaseInfo.data.push(v.value)

            }
          } else {
            ybaseInfo.data.push(0)
          }
        })
        series.value.push(ybaseInfo)
      })
    }
  })
}

function clearDate() {
  // const xAxis = ref()
  // const yAxis = ref()
  // const legendSelectInfo = ref()
  xDataArray.value.length = 0
  series.value.length = 0
  // const hasXaxisEvent = ref(true)
  // const objectEnumSign = ref('minute_emotion_statistic')

}

onMounted(() => {
  getMinuteStaticByDate()

})
</script>

<style scoped>
.chart-minuter-emotion {
  width: 50%;
  display: inline-block;
}
</style>
