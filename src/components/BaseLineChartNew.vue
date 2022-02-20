<template>
  <div class="block">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chart" id="lineCharId" :style="charStyle"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import {onMounted, onUpdated, reactive, ref} from 'vue'

import router from "@/config/router";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import EchartsStyle from "@/module/EchartsStyle";

export default {
  name: 'BaseLineChartNew',
  props:{
    baseLineEcharts:{
      type: Object,
      // default: function () {
      //   return new BaseLineEcharts();
      // }
    },
    charStyle:{
      type: Object,
      default: function () {
        return new BaseLineEcharts().stype;
      }
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
        tooltip: props.baseLineEcharts.tooltip,
        //图例组件
        legend: props.baseLineEcharts.legend,
        grid: props.baseLineEcharts.grid,
        toolbox: props.baseLineEcharts.toolbox,
        xAxis:props.baseLineEcharts.xAxis,
        yAxis: props.baseLineEcharts.yAxis,
        series: props.baseLineEcharts.series
      };
      if (props.baseLineEcharts.hasXaxisEvent) {
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
