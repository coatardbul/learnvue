<template>
  <div class="block">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chart" id="main" style="width: 100%;height:700px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {onMounted, onUpdated, ref} from 'vue'

import router from "@/config/router";

export default {
  name: 'BaseMinuteLineChart',
  props: {
    xAxis: {
      type: Object,
      default: function () {
        return {
          name: 'x轴',
          type: 'category',
        }
      }
    },
    yAxis: {
      type: Array,
      default: function () {
        return [{
          type: 'value',
          name: '数值',
          position: 'left',
        }]
      }
    },
    xDataArray: {
      type: Array,
      default: function () {
        return [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      }
    },
    legendSelectInfo:{
      type:Object,
      default:function (){
        return{
          // 选中'系列1'
          '降水量': true,
          '温度': false,

        }
      }
    },
    series: {
      type: Array,
      default: function () {
        return [
          {
            name: '降水量',
            type: 'line',
            data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
          },
          {
            name: '温度',
            type: 'line',
            data: [
              6.0,
              10.2,
              10.3,
              11.5,
              10.3,
              13.2,
              14.3,
              16.4,
              18.0,
              16.5,
              12.0,
              5.2
            ]
          }
        ]
      }
    },
    hasXaxisEvent: {
      type: Boolean,
      default: false
    },
    xAxisRouter: {
      type: String,
      default: '/index4'
    }
  },

  setup(props) {

    const chart = ref();


    onMounted(() => {
      init();
    })

    function init() {

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(chart.value);

      // 指定图表的配置项和数据
      var option = {
        //提示框组件
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'cross'}
        },
        //图例组件
        legend: {
          show: true,
          //上面标签是否翻页，标签多的时候使用
          type: "scroll",
          selected: props.legendSelectInfo,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: props.xAxis.name,
          type: props.xAxis.type,
          boundaryGap: false,
          //名称位置
          nameLocation: "end",
          nameGap: 0,
          // x轴绑定事件标签
          triggerEvent: true,
          axisLabel: {
            show: true,
            //标签之间间隔距离
            interval: 0,
            inside: false,
            //标签与坐标轴的距离
            margin: 1,
          },
          splitLine: {
            show: true
          },
          data: props.xDataArray
        },
        yAxis: props.yAxis,
        series: props.series
      };
      if (props.hasXaxisEvent) {
        myChart.on('click', function (params) {
          router.push({path: props.xAxisRouter, query: {erb: params.value}})
        });
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }

    return {
      chart, init
    }
  }

}


</script>
