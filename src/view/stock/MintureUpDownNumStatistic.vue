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
    queryParam: {
      type: Object,
    }
  },
  setup(props, context) {
    //初始化参数

    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))

    function getAllStockInfoByDate() {
      if (!props.queryParam) {
        return
      }
      if(props.queryParam.objectSign.length==0){
        return;
      }
      setLegend();
      axios.post(AxiosUrl.stock.stockMinuteStatic.getDayDetail, {
        dateStr: props.queryParam == null || props.queryParam.dateStr == null ? ConfigInfo.nowDate : props.queryParam.dateStr,
        objectEnumSign: props.queryParam.objectSign,
        timeInterval: props.queryParam == null || props.queryParam.timeInterval == null ? ConfigInfo.emotionInfo.defaultTimeInterval : props.queryParam.timeInterval
      }).then((res) => {
        if (res == null) {
          return
        }
        baseLineEcharts.xAxis.length = 0;
        let xaxis = new Xaxis();
        xaxis.data = res.dateTimeStrArray;
        baseLineEcharts.xAxis.push(xaxis);

        baseLineEcharts.yAxis.length = 0;
        let yleftAxis = new YleftAxis();
        baseLineEcharts.yAxis.push(yleftAxis);


        res.ybaseInfo.forEach(v => {
          let seriesIndex = {
            name: v.name,
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: []
          }
          //数组数据
          res.dateTimeStrArray.forEach(timeStr => {
            let find = v.yaxiosInfo.find(v => v && timeStr === v.dateTimeStr);
            if (find) {
              seriesIndex.data.push(find.value);
            } else {
              seriesIndex.data.push(0);
            }
          })
          baseLineEcharts.series.push(seriesIndex);
        })
        let sortSeries1 = sortSeries();
        baseLineEcharts.series.length=0;
        baseLineEcharts.series=sortSeries1;
      });
      setColor();
    }

    function setColor(){
      baseLineEcharts.color=[];
      baseLineEcharts.color.push('#f6040c');
      baseLineEcharts.color.push('#f5076a');
      baseLineEcharts.color.push('rgba(236,7,205,0.99)');
      baseLineEcharts.color.push('rgba(130,29,145,0.5)');
      baseLineEcharts.color.push('rgba(239,8,27,0.56)');
      baseLineEcharts.color.push('#f3bc08');
      baseLineEcharts.color.push('rgba(163,199,173,0.56)');
      baseLineEcharts.color.push('rgba(234,198,179,0.53)');
      baseLineEcharts.color.push('rgb(23,115,164)');
      baseLineEcharts.color.push('#4926e3');
      baseLineEcharts.color.push('#08f108');


    }

    function sortSeries(){
      let newSeries=[];

      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅涨幅'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于7未涨停'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于5小于等于7'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于3小于等于5'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于0小于等于3'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅等于0'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于等于-3小于0'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于等于-5小于-3'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅大于等于-7小于-5'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅小于-7未跌停'));
      newSeries.push( baseLineEcharts.series.find(item=>item.name=='涨幅跌停'));


      return newSeries;
    }

    function setLegend() {
      baseLineEcharts.legend.top = "top";
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
