<template>
  <div>
    <div ref="chart" id="main" style="width: 100%;height:700px;"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import {ref,onMounted} from "vue";

const chart = ref()
onMounted(()=>{
  init()
})
function init() {
  var myChart = echarts.init(chart.value);
  var option;

  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      show: true,
      //上面标签是否翻页，标签多的时候使用
      type: "scroll",
      selected: {
        // 选中'系列1'
        '降水量': true,
        '温度': false,

      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: [
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
    ],
    yAxis: [
      {
        type: 'value',
        name: '降水量',
        min: 0,
        max: 250,
        position: 'right',
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 25,
        position: 'left',
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: '降水量',
        type: 'bar',
        seriesIndex: 0,
        data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
      },
      {
        name: '降水量1',
        type: 'radar',
        yAxisIndex: 0,
        data: [6, 49, 70, 90, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
      },
      {
        name: '温度',
        type: 'line',
        yAxisIndex: 1,
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
  };

  myChart.setOption(option);

}
</script>
