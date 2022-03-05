<template>
  <BaseLineChartNew
      :base-line-echarts="baseLineEcharts"
      :char-style="charStyle"
      v-if=" baseLineEcharts.series.length>0"
  ></BaseLineChartNew>
</template>

<script>
import BaseLineChartNew from "@/components/BaseLineChartNew";
import {reactive, onMounted} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import BaseEcharts from "@/module/BaseEcharts";
import EchartsUtils from "@/module/EchartsUtils";

export default {
  components: {
    BaseLineChartNew
  },
  props: {
    beginDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
    charStyle: {
      type: Object,
      default: function () {
        return {width: '50%', height: '360px'}
      }
    }
  },
  setup(props, context) {
    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))
    function getAllStockInfoByDate() {
      axios.post(AxiosUrl.stock.static.getDateStatic, {
        dateBeginStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        dateEndStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
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
          baseLineEcharts.xAxis[0].data.push(v.date)

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
        baseLineEcharts.series.push(medianArrayObject)
        let standardDeviationArrayObject = {
          name: '标准差',
          type: 'line',

          data: standardDeviationArray
        }
        baseLineEcharts.series.push(standardDeviationArrayObject)
        let medianArrayObjectOne = {
          name: '中位数1',
          type: 'line',

          data: medianArrayOne
        }
        baseLineEcharts.series.push(medianArrayObjectOne)
        let standardDeviationArrayObjectOne = {
          name: '标准差1',
          type: 'line',

          data: standardDeviationArrayOne
        }
        baseLineEcharts.series.push(standardDeviationArrayObjectOne)
        let medianArrayObjectTwo = {
          name: '中位数2',
          type: 'line',

          data: medianArrayTwo
        }
        baseLineEcharts.series.push(medianArrayObjectTwo)
        let standardDeviationArrayObjectTwo = {
          name: '标准差2',
          type: 'line',
          data: standardDeviationArrayTwo
        }
        baseLineEcharts.series.push(standardDeviationArrayObjectTwo)
      });
    }



    onMounted(() => {
     EchartsUtils. clearCache(baseLineEcharts);

      getAllStockInfoByDate()

      baseLineEcharts.legend.selected = {
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
    })
    return {
      baseLineEcharts, getAllStockInfoByDate
    }
  }
}
</script>

<style scoped>

</style>
