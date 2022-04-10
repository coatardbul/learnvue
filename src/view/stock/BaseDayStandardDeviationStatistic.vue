<template>
  <BaseLineChart
      :base-line-echarts="baseLineEcharts"
      :char-style="charStyle"
      v-if=" baseLineEcharts.series.length>0"
  ></BaseLineChart>
</template>

<script>
import BaseLineChart from "@/components/BaseLineChart";
import {reactive, onMounted} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import BaseEcharts from "@/module/BaseEcharts";
import EchartsUtils from "@/module/EchartsUtils";

export default {
  components: {
    BaseLineChart
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
        return {width: '100%', height: '360px'}
      }
    }
  },
  setup(props, context) {
    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))

    function getAllStockInfoByDate() {
      axios.post(AxiosUrl.stock.stockDayStatic.getRangeStatic, {
        dateBeginStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        dateEndStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
        objectEnumSign: 'day_trumpet_calc_statistic'
      }).then((res) => {
        res.forEach(obj => {
          baseLineEcharts.xAxis[0].data.push(obj.date)
          JSON.parse(obj.objectStaticArray).forEach(v => {

             let seriesIndex = baseLineEcharts.series.find(item=>item.name==v.name);
            if(seriesIndex){
              seriesIndex.data.push(v.value);
            }else {
             let seriesIndexDateArr=[]
             seriesIndexDateArr.push(v.value);
             let medianArrayObject = {
               name: v.name,
               type: 'line',
               data: seriesIndexDateArr
             }
               baseLineEcharts.series.push(medianArrayObject);

            }
          })
        })

      });
    }


    onMounted(() => {
      EchartsUtils.clearCache(baseLineEcharts);

      getAllStockInfoByDate()

      baseLineEcharts.legend.selected = {
        '首板标准差': true,
        '首板中位数': true,
        '二板标准差': false,
        '二板中位数': false,
        '二板以上标准差': false,
        '二板以上中位数': false,
        '三板以上标准差': false,
        '三板以上中位数': false,
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
