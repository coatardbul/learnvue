<template>
  <EmotionDayFormLine @query-day-emotion="getDayStatic"></EmotionDayFormLine>

  <NumEight :begin-date="'2022-01-01'"
            :end-date="'2022-12=31'"
  ></NumEight>

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
import NumEight from './Num8'
import {getCurrentInstance, onBeforeMount, onMounted, onUpdated, ref} from "vue";
import AxiosUrl from '/src/constant/AxiosUrl'
import axios from "axios";
import moment from "moment";
import {reactive} from "vue";
import ConfigInfo from '/src/constant/ConfigInfo'
import EmotionDayFormLine from './EmotionDayFormLine'
import Vue from "vue";


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


const legendSelectInfo = reactive({})
const xDataArray = ref([])
const series = ref([])
const hasXaxisEvent = ref(true)


function getDayStatic(queryParam) {
  clearDate()
  getDayStaticByDateRange(queryParam);
}

//获取数据
function getDayStaticByDateRange(queryParam) {
  axios.post(AxiosUrl.stock.stockDayStatic.getRangeStatic, {
    beginDateStr: queryParam == null || queryParam.dateRangeArray.length == 0 ? ConfigInfo.dateUtil.rangeDateArray[0] : queryParam.dateRangeArray[0],
    endDateStr: queryParam == null || queryParam.dateRangeArray.length == 0 ? ConfigInfo.dateUtil.rangeDateArray[1] : queryParam.dateRangeArray[1],
    objectEnumSign: queryParam == null || queryParam.objectSign.length == 0 ? ConfigInfo.emotionInfo.defaultDayObjectSign : queryParam.objectSign,
  }).then((res) => {
    if (res == null) {
      return
    }
    if (res.length > 0) {
      let nameArray = []
      res.forEach(v => {
        xDataArray.value.push(v.date)
        JSON.parse(v.objectStaticArray).forEach(c => {
          if (nameArray.findIndex(t => t === c.name) < 0) {
            nameArray.push(c.name)
          }
        })
        //todo 判断是否包含名称，动态显示
      })
      nameArray.forEach(v => {
        let seriesIndex = {
          name: v,
          type: 'line',
          data: []
        }
        //次坐标
        if (v === 'adjs') {
          seriesIndex.yAxisIndex = 1

          legendSelectInfo.adjs = false
          // Vue.set(legendSelectInfo,v, true)
        }


        res.forEach(c => {
          JSON.parse(c.objectStaticArray).forEach(b => {
            if (v === b.name) {

              if (v.indexOf("跌停") >= 0||v.indexOf("未回封")>=0) {
                seriesIndex.data.push(0 - b.value)
              } else {
                seriesIndex.data.push(b.value)
              }
            }
          })
        })
        series.value.push(seriesIndex);
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
  getDayStaticByDateRange()

})
</script>

<style scoped>

</style>
