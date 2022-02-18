<template>
  <BaseLineChart ref="baseLineChart" :x-axis="xAxis"
                 :y-axis="yAxis"
                 :x-data-array="xDataArray"
                 :series="series"
                 :has-xaxis-event="hasXaxisEvent"
                 :legend-select-info="legendSelectInfo"
                 v-if="xDataArray.length>0 && series.length>0"
  ></BaseLineChart>
</template>

<script>
import BaseLineChart from '/src/components/BaseLineChart'
import {getCurrentInstance, onBeforeMount, onMounted, onUpdated, ref} from "vue";
import AxiosUrl from '/src/constant/AxiosUrl'
import axios from "axios";



export default {
  name: "Num8",
  components: {BaseLineChart},
  props:{
    beginDate:{
      type:String,
      default:null,
    },
    endDate:{
      type:String,
      default:null,
    }
  },
  setup(props,context) {
    const baseLineChart = ref()
    const xAxis = ref()
    const yAxis = ref()
    const legendSelectInfo = ref()
    const xDataArray = ref([])
    const series = ref([])
    const hasXaxisEvent = ref(true)
//获取数据
    function getAllStockInfoByDate(beginDate, endDate) {
      axios.post(AxiosUrl.stock.static.getDateStatic, {
        dateBeginStr:props.beginDate==null || props.beginDate.length===0? '2022-01-01':props.beginDate,
        dateEndStr: props.endDate==null || props.endDate.length===0? '2022-12-31':props.endDate,
      }).then((res) => {
        let medianArray = []
        let standardDeviationArray = []
        let raiseLimitNumArray = []
        let medianArrayOne = []
        let standardDeviationArrayOne = []
        let raiseLimitNumArrayOne = []

        let medianArrayTwo = []
        let standardDeviationArrayTwo = []
        let raiseLimitNumArrayTwo = []
        res.forEach(v => {
          if (v.median == null || v.median.length == 0) {
            return
          }
          xDataArray.value.push(v.date)
          medianArray.push(v.median)
          standardDeviationArray.push(v.standardDeviation)
          raiseLimitNumArray.push(v.raiseLimitNum)

          medianArrayOne.push(v.medianOne)
          standardDeviationArrayOne.push(v.standardDeviationOne)
          raiseLimitNumArrayOne.push(v.raiseLimitNumOne)

          medianArrayTwo.push(v.medianTwo)
          standardDeviationArrayTwo.push(v.standardDeviationTwo)
          raiseLimitNumArrayTwo.push(v.raiseLimitNumTwo)
        })


        let medianArrayObject = {
          name: '中位数',
          type: 'line',
          data: medianArray
        }
        series.value.push(medianArrayObject)
        let standardDeviationArrayObject = {
          name: '标准差',
          type: 'line',

          data: standardDeviationArray
        }
        series.value.push(standardDeviationArrayObject)
        let medianArrayObjectOne = {
          name: '中位数1',
          type: 'line',

          data: medianArrayOne
        }
        series.value.push(medianArrayObjectOne)
        let standardDeviationArrayObjectOne = {
          name: '标准差1',
          type: 'line',

          data: standardDeviationArrayOne
        }
        series.value.push(standardDeviationArrayObjectOne)
        let medianArrayObjectTwo = {
          name: '中位数2',
          type: 'line',

          data: medianArrayTwo
        }
        series.value.push(medianArrayObjectTwo)
        let standardDeviationArrayObjectTwo = {
          name: '标准差2',
          type: 'line',
          data: standardDeviationArrayTwo
        }
        series.value.push(standardDeviationArrayObjectTwo)
      });
    }

    onMounted(() => {

      getAllStockInfoByDate(props.beginDate, props.endDate)
      xAxis.value = {
        name: '日期',
        type: 'category',
      }
      legendSelectInfo.value = {
        // 选中'系列1'
        '中位数': true,
        // 不选中'系列2'
        '标准差': true,
        // 选中'系列1'
        '中位数1': true,
        // 不选中'系列2'
        '标准差1': true,
        // 选中'系列1'
        '中位数2': false,
        // 不选中'系列2'
        '标准差2': false,
      }

      // baseLineChart.value.init()
    })
    return{
      getAllStockInfoByDate,baseLineChart,xAxis,yAxis,legendSelectInfo,xDataArray,series,hasXaxisEvent
    }
  }
}
</script>

<style scoped>

</style>
