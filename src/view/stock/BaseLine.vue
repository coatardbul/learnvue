<template>
  <div class="block">
    <span class="demonstration"
    >日期区间</span
    >
    <el-date-picker
        v-model="dateRangeArray"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
    >
    </el-date-picker>
    <el-button @click="getAllStockInfo">查询</el-button>
  </div>

  <div class="block1">
    <body>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chart" id="main" style="width: 100%;height:700px;"></div>
    </body>
  </div>
</template>
<script setup>

import * as echarts from 'echarts'
import {onMounted, ref, reactive} from 'vue'
import axios from "axios";

import moment from "moment";
import router from "@/config/router";

const dateRangeArray = ref([
  new Date(2022, 0, 1, 10, 10),
  new Date(),
])

//获取数据
function getAllStockInfo() {
  //清空数组
  series.length = 0
  xDataArray.length = 0
  // series.splice(0, series.length)
  // xDataArray.splice(0, xDataArray.length)
  let beginDate = moment(dateRangeArray.value[0]).format("YYYY-MM-DD")
  let endDate = moment(dateRangeArray.value[1]).format("YYYY-MM-DD")
  getAllStockInfoByDate(beginDate, endDate);
}


//获取数据
function getAllStockInfoByDate(beginDate, endDate) {
  axios.post("stock/stockQuery/getAllStatic", {
    dateBeginStr: beginDate,
    dateEndStr: endDate
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
      xDataArray.push(v.date)
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
    series.push(medianArrayObject)
    let standardDeviationArrayObject = {
      name: '标准差',
      type: 'line',

      data: standardDeviationArray
    }
    series.push(standardDeviationArrayObject)
    // let raiseLimitNumArrayObject= {
    //   name: '个数',
    //   type: 'line',
    //
    //   data: raiseLimitNumArray
    // }
    // series.push(raiseLimitNumArrayObject)
    let medianArrayObjectOne = {
      name: '中位数1',
      type: 'line',

      data: medianArrayOne
    }
    series.push(medianArrayObjectOne)
    let standardDeviationArrayObjectOne = {
      name: '标准差1',
      type: 'line',

      data: standardDeviationArrayOne
    }
    series.push(standardDeviationArrayObjectOne)
    // let raiseLimitNumArrayObjectOne= {
    //   name: '个数',
    //   type: 'line',
    //
    //   data: raiseLimitNumArrayOne
    // }
    // series.push(raiseLimitNumArrayObjectOne)
    let medianArrayObjectTwo = {
      name: '中位数2',
      type: 'line',

      data: medianArrayTwo
    }
    series.push(medianArrayObjectTwo)
    let standardDeviationArrayObjectTwo = {
      name: '标准差2',
      type: 'line',

      data: standardDeviationArrayTwo
    }
    series.push(standardDeviationArrayObjectTwo)
    // let raiseLimitNumArrayObjectTwo= {
    //   name: '个数',
    //   type: 'line',
    //
    //   data: raiseLimitNumArrayTwo
    // }
    // series.push(raiseLimitNumArrayObjectTwo)

    init()
  });
}

const chart = ref();

onMounted(() => {
  getAllStockInfoByDate(moment(dateRangeArray.value[0]).format("YYYY-MM-DD"),
      moment(dateRangeArray.value[1]).format("YYYY-MM-DD"));
  init();
})

const xDataArray = reactive([])
const series = reactive([])

function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(chart.value);

  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
    },
    legend: {
      show: true,
      selected: {
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
      },
      // data: [
      //   {
      //     name: '中位数',
      //     // 强制设置图形为圆。
      //     icon: 'circle',
      //     // 设置文本为红色
      //     textStyle: {
      //       color: 'red'
      //     }
      //   },
      //   {
      //     name: '标准差',
      //     // 强制设置图形为圆。
      //     icon: 'circle',
      //     // 设置文本为红色
      //     textStyle: {
      //       color: 'red'
      //     }
      //   },
      //   {
      //     name: '中位数1',
      //     // 强制设置图形为圆。
      //     icon: 'circle',
      //     // 设置文本为红色
      //     textStyle: {
      //       color: 'red'
      //     }
      //   },
      //   {
      //     name: '标准差1',
      //     // 强制设置图形为圆。
      //     icon: 'circle',
      //     // 设置文本为红色
      //     textStyle: {
      //       color: 'red'
      //     }
      //   },
      //
      //   {
      //     name: '中位数2',
      //     // 强制设置图形为圆。
      //     icon: 'circle',
      //     // 设置文本为红色
      //     textStyle: {
      //       color: 'red'
      //     }
      //   },
      //   {
      //     name: '标准差2',
      //     // 强制设置图形为圆。
      //     icon: 'circle',
      //     // 设置文本为红色
      //     textStyle: {
      //       color: 'red'
      //     }
      //   },
      // ]
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
      name: '日期',
      boundaryGap: false,
      nameLocation: "end",
      nameGap: 0,
      //todo
      triggerEvent: true,
      //标签之间间隔距离
      axisLabel: {
        show: true,
        interval: 0,
        inside: false,
        //标签与坐标轴的距离
        margin: 1,
      },
      splitLine: {
        show: true
      },
      data: xDataArray
    },
    yAxis: [
      {
        type: 'value',
        name: '数值',
        position: 'left',
      }
    ],
    series: series
  };


  myChart.on('click', function (params) {


    router.push({path: '/index4', query: {erb: params.value}})


  });
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>
