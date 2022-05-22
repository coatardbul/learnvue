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
import ConfigInfo from "@/constant/ConfigInfo";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";
import BaseEcharts from "@/module/BaseEcharts";
import EchartsUtils from "@/module/EchartsUtils";

export default {
  components: {
    BaseLineChart
  },
  props: {
    charStyle: {
      type: Object,
      default: function () {
        return {width: '50%', height: '3600px'}
      }
    },
    queryParam:{
      type:Object,
    }
  },
  setup(props, context) {
    //初始化参数

    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))

    function getAllStockInfoByDate() {
      if(!props.queryParam){
        return
      }
      setLegend();
      setGrid(baseLineEcharts,parseInt(props.charStyle.height.replace('px',''))/2.3);
      axios.post(AxiosUrl.stock.stockMinuteStatic.getDayDetail, {
        dateStr: props.queryParam == null || props.queryParam.dateStr == null ? ConfigInfo.nowDate : props.queryParam.dateStr,
        objectEnumSign:  props.queryParam.objectSign ,
        timeInterval: props.queryParam == null || props.queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : props.queryParam.timeInterval
      }).then((res) => {
        if (res == null) {
          return
        }
        baseLineEcharts.xAxis.length=0;
        for (let i = 0; i < 2; i++) {
          let xaxis = new Xaxis();
          xaxis.gridIndex = i;
          xaxis.data = res.dateTimeStrArray;
          baseLineEcharts.xAxis.push(xaxis);
        }
        baseLineEcharts.yAxis.length=0;
        for (let i = 0; i < 2; i++) {
          let yleftAxis = new YleftAxis();
          yleftAxis.gridIndex = i;
          // if(i==0){
          //   yleftAxis.min=-100;
          //   yleftAxis.max=0;
          // }
          // if(i==1){
          //   yleftAxis.min=0;
          //   yleftAxis.max=100;
          // }
          baseLineEcharts.yAxis.push(yleftAxis);
        }

        res.ybaseInfo.forEach(v=>{
          let seriesIndex = {
            name: v.name,
            type: 'line',
            data: []
          }
          if (v.name=="主板跌停（包括一字跌停）" ||v.name.trim()=="主板炸板" ) {
            seriesIndex.xAxisIndex = 0;
            seriesIndex.yAxisIndex = 0;
            //数组数据
            res.dateTimeStrArray.forEach(timeStr=>{
              let find = v.yaxiosInfo.find(v=>v&&timeStr=== v.dateTimeStr);
              if(find){
                seriesIndex.data.push(0-find.value);
              }else {
                seriesIndex.data.push(null);
              }
            })
          }else {
            seriesIndex.xAxisIndex = 1;
            seriesIndex.yAxisIndex = 1;
            //数组数据
            res.dateTimeStrArray.forEach(timeStr=>{
              let find = v.yaxiosInfo.find(v=>v&&timeStr=== v.dateTimeStr);
              if(find){
                seriesIndex.data.push(find.value);
              }else {
                seriesIndex.data.push(null);
              }
            })
          }

          baseLineEcharts.series.push(seriesIndex);
        })

      });
    }


    function setLegend(){
      baseLineEcharts.legend.top="top";
    }

    function setGrid(baseLineEcharts, num) {
      baseLineEcharts.grid.length = 0;
      for (let i = 0; i < 2; i++) {
        let sb = {
          left: 60,
          right: 50,
          height: num+'px'
        }
        if(i==0){
          sb.top = 25 + 'px';
        }else {
          sb.top = 1.25* i* num + 'px';
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
