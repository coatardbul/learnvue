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
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";

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
        return {width: '100%', height: '1000px'}
      }
    }
  },
  setup(props, context) {
    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))


    function getAllStockInfoByDate() {
      axios.post(AxiosUrl.stock.marketValueScatterStatic.getRangeStatic, {
        dateBeginStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        dateEndStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
        objectEnumSign: 'day_market_Value_statistic'
      }).then((res) => {

        let dataset = []
        res.forEach(item => {
          baseLineEcharts.xAxis[0].data.push(item.date);
          JSON.parse(item.objectStaticArray).forEach(v => {
                let dataIndex = [];
                dataIndex.push(item.date);
                dataIndex.push(v.marketValue);
                dataIndex.push(v.code);
                dataIndex.push(v.name);
                dataIndex.push(v.tradeMoney);
                dataIndex.push(v.turnoverRate);
                dataset.push(dataIndex);
              }
          )
        })
        let serviceIndex = {
          name: '市值',
          type: 'scatter',
          itemStyle: {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(196,46,46,0.3)'
          },
          data:dataset
        }

        baseLineEcharts.series.push(serviceIndex);
        let serieIndex2 = Object.assign({},serviceIndex,{
          xAxisIndex : 1,
          yAxisIndex :1,
        });
        baseLineEcharts.series.push(serieIndex2);
        let serieIndex3 = Object.assign({},serviceIndex,{
          xAxisIndex : 2,
          yAxisIndex :2,
        });
        baseLineEcharts.series.push(serieIndex3);


        let xAxisIndex2 = Object.assign({}, baseLineEcharts.xAxis[0],{
          gridIndex : 1,
        });
        baseLineEcharts.xAxis.push(xAxisIndex2);
        let xAxisIndex3 = Object.assign({}, baseLineEcharts.xAxis[0],{
          gridIndex : 2,
        });
        baseLineEcharts.xAxis.push(xAxisIndex3);

        setGrid(500);

        let datasetSourceIndex = {
          source: dataset
        }
        baseLineEcharts.dataset.push(datasetSourceIndex);
      });

    }

    function setGrid(num){
      baseLineEcharts.grid.length = 0;
      baseLineEcharts.grid.length = 0;
      let totalTop=0;
      let onTop=40;
      let intervalHeight=40;
      for (let i = 0; i < 3; i++) {
        let sb = {
          left: 60,
          right: 100,
          height: num+'px'
        }
        if(i==0){
          sb.top = onTop + 'px';
          sb.height=0.3*num;
          totalTop+=onTop;
          totalTop+=sb.height;
        }
        if(i==1){
          sb.top = totalTop + 'px';
          sb.height=0.5*num;
          totalTop+=intervalHeight;
          totalTop+=sb.height;
        }
        if(i==2){
          sb.top = totalTop + 'px';
          sb.height=1*num;
          totalTop+=intervalHeight;
          totalTop+=sb.height;
        }

        if(i==3){
          sb.top = totalTop + 'px';
          sb.height=1.0*num;
          totalTop+=intervalHeight;
          totalTop+=sb.height;
        }
        baseLineEcharts.grid.push(sb);
      }

    }

    function clearSlotCache() {
      baseLineEcharts.axisPointer = {}

    }

    function firstInit() {

      setTooltip()

      setVisualMap();

      setYaxis();


    }

    function setTooltip(){
      const schema = [
        {name: 'date', index: 0, text: '日'},
        {name: '市值', index: 1, text: '市值'},
        {name: '股票代码', index: 2, text: '股票代码'},
        {name: '股票名称', index: 3, text: '股票名称'},
        {name: '交易金额', index: 4, text: '交易金额'},
        {name: '换手率', index: 5, text: '换手率'},
      ];
      baseLineEcharts.tooltip = {
        backgroundColor: 'rgb(234,198,179)',
        formatter: function (param) {
          var value = param.value;
          // prettier-ignore
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
              + value[0] + '日：'
              + '</div>'
              + schema[1].text + '：' + (value[1] / 10000 / 10000).toFixed(2) + '亿' + '<br>'
              + schema[2].text + '：' + value[2] + '<br>'
              + schema[3].text + '：' + value[3] + '<br>'
              + schema[4].text + '：' + (value[4] / 10000 / 10000).toFixed(2) + '亿' + '<br>'
              + schema[5].text + '：' + value[5].toFixed(2) + '%' + '<br>';
        }
      }

    }

    function setVisualMap(){
      let visio = {
        left: 'right',
        top: '20%',
        dimension: 4,
        min: 0.1*10000*10000,
        max: 111*10000*10000,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        text: ['交易金额'],
        // hoverLink:true,
        textGap: 30,
        inRange: {
          symbolSize: [4, 45],
        },
        outOfRange: {
          symbolSize: [10, 70],
          color: ['rgba(255,255,255,0.65)']
        },
        // controller: {
        //   inRange: {
        //     color: ['#c23531']
        //   },
        //   outOfRange: {
        //     color: ['#999']
        //   }
        // }
      };

      baseLineEcharts.visualMap.push(visio);

    }

    function setYaxis(){
      let yAxisIndex1 = {
        type: 'value',
        min: 500 *10000*10000,
        max: 2000 *10000*10000,
        splitLine: {
          lineStyle: {
            type: 'dashed',
          }
        },
        axisLabel: {
          formatter: function (value, index) {
            return value / 10000 / 10000 + '亿';
          }
        },
      }
      let yAxisIndex2 = Object.assign({}, yAxisIndex1, {
        min: 100 *10000*10000,
        max: 500 *10000*10000,
        gridIndex : 1,
      });
      let yAxisIndex3 = Object.assign({}, yAxisIndex1, {
        min: 10 *10000*10000,
        max: 100 *10000*10000,
        gridIndex : 2,
      });
      baseLineEcharts.yAxis = [];
      baseLineEcharts.yAxis.push(yAxisIndex1);
      baseLineEcharts.yAxis.push(yAxisIndex2);
      baseLineEcharts.yAxis.push(yAxisIndex3);
    }


    onMounted(() => {
      EchartsUtils.clearCache(baseLineEcharts);
      clearSlotCache();
      firstInit();
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
