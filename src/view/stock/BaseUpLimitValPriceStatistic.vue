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
    dateStr: {
      type: String,
      default: null,
    },
    code: {
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
      axios.post(AxiosUrl.stock.stockValPrice.getAll, {
        dateStr: props.dateStr == null || props.dateStr.length === 0 ? '2022-03-30' : props.dateStr,
        code: props.code == null || props.code.length === 0 ? '000965' : props.code,
      }).then((res) => {
        res.forEach(obj => {
          baseLineEcharts.title={
            text: obj.code+'-'+obj.name,
            subtext: obj.beginDate+'-'+obj.endDate,
            left: 'center',
            top:20,
          }
          JSON.parse(obj.objectArray).forEach(v => {
            baseLineEcharts.xAxis[0].data.push(v.dateStr)
            Object.keys(v).forEach(key=>{
              if('dateStr'==key){
                return;
              }
              let seriesIndex = baseLineEcharts.series.find(item=>item.name==key);
              if(seriesIndex){
                seriesIndex.data.push(v[key]);
              }else {
                let seriesIndexDateArr=[]
                seriesIndexDateArr.push(v[key]);
                let medianArrayObject = {
                  name: key,
                  type: 'line',
                  data: seriesIndexDateArr
                }
                baseLineEcharts.series.push(medianArrayObject);
              }
            })

          })
        })

      });
    }


    onMounted(() => {
      EchartsUtils.clearCache(baseLineEcharts);

      getAllStockInfoByDate()

      baseLineEcharts.legend.selected = {
        // 选中'系列1'
        '首板标准差': true,
        // 不选中'系列2'
        '首板中位数': true,
        // 选中'系列1'
        '二板以上标准差': false,
        // 不选中'系列2'
        '二板以上中位数': false,
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
