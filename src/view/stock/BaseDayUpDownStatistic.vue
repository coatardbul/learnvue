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
import ConfigInfo from "@/constant/ConfigInfo";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";
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
        return {width: '50%', height: '3600px'}
      }
    }
  },
  setup(props, context) {
    //初始化参数

    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))

    function getAllStockInfoByDate() {

      firstInit();

      axios.post(AxiosUrl.stock.stockDayStatic.getRangeStatic, {
        beginDateStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        endDateStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
        objectEnumSign: props.queryParam == null || props.queryParam.objectSign.length == 0 ? ConfigInfo.emotionInfo.defaultDayObjectSign : props.queryParam.objectSign,
      }).then((res) => {
        if (res == null) {
          return
        }
        if (res.length > 0) {
          let nameArray = []
          res.forEach((v) => {
            baseLineEcharts.xAxis[0].data.push(v.date)
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
            res.forEach(c => {
              JSON.parse(c.objectStaticArray).forEach(b => {
                if (v === b.name) {
                  //坐标轴
                  if (v.indexOf("跌停") >= 0) {
                    seriesIndex.xAxisIndex = 0;
                    seriesIndex.yAxisIndex = 0;
                  }
                  if (v.indexOf("adjs") >= 0) {
                    seriesIndex.xAxisIndex = 1;
                    seriesIndex.yAxisIndex = 1;
                  }
                  if (v.indexOf("炸板") >= 0 || v.indexOf("涨停") >= 0) {
                    seriesIndex.xAxisIndex = 2;
                    seriesIndex.yAxisIndex = 2;
                  }
                  if (v.indexOf("连涨") >= 0) {
                    seriesIndex.xAxisIndex = 3;
                    seriesIndex.yAxisIndex = 3;
                  }

                  if (v.indexOf("跌停") >= 0 || v.indexOf("未回封") >= 0) {
                    seriesIndex.data.push(0 - b.value)
                  } else {
                    seriesIndex.data.push(b.value)
                  }
                }
              })
            })
            baseLineEcharts.series.push(seriesIndex);
          })
        }


        for (let i = 1; i < 4; i++) {
          let data = baseLineEcharts.xAxis[0].data;
          let xaxis = new Xaxis();
          xaxis.gridIndex = i;
              xaxis.data = data;
          baseLineEcharts.xAxis.push(xaxis);
        }

        for (let i = 1; i < 4; i++) {
          let yleftAxis = new YleftAxis();
          yleftAxis.gridIndex = i;
          baseLineEcharts.yAxis.push(yleftAxis);
        }
      });
    }



    function firstInit(){
      setLegend();
      setGrid(baseLineEcharts,200);
    }


    function setLegend(){
      baseLineEcharts.legend.top="top";
    }

    function setGrid(baseLineEcharts, num) {
      baseLineEcharts.grid.length = 0;
      let totalTop=0;
      let onTop=40;
      let intervalHeight=40;
      for (let i = 0; i < 4; i++) {
        let sb = {
          left: 60,
          right: 50,
          height: num+'px'
        }
        if(i==0){
          sb.top = onTop + 'px';
          sb.height=0.8*num;
          totalTop+=onTop;
          totalTop+=sb.height;
        }
        if(i==1){
          sb.top = totalTop + 'px';
          sb.height=0.7*num;
          totalTop+=intervalHeight;
          totalTop+=sb.height;
        }
        if(i==2){
          sb.top = totalTop + 'px';
          sb.height=2*num;
          totalTop+=intervalHeight;
          totalTop+=sb.height;
        }

        if(i==3){
          sb.top = totalTop + 'px';
          sb.height=1.5*num;
          totalTop+=intervalHeight;
          totalTop+=sb.height;
        }
        baseLineEcharts.grid.push(sb);
      }

    }


    onMounted(() => {
      EchartsUtils.clearCache(baseLineEcharts);
      getAllStockInfoByDate()
    })
    return {
      baseLineEcharts, getAllStockInfoByDate
    }
  }
}
</script>

<style scoped>

</style>
