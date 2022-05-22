<template>
  <UpLimitFormLine
      ref="queryRef"
      @query="getIntervalStatic"
  ></UpLimitFormLine>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item>
      <el-switch
          v-model="showFlag"
          class="ml-2"
          size="large"
          active-text="是否显示标签"
          @change="refreshEcharts"
      />
    </el-form-item>
    <el-form-item>
      <el-switch
          v-model="showNameOrThemeFlag"
          class="ml-2"
          size="large"
          active-text="名称题材切换"
          @change="refreshEcharts"
      />
    </el-form-item>
  </el-form>

  <BaseLineChart
      :base-line-echarts="baseLineEcharts"
      :char-style="charStyle"
      v-if="baseLineEcharts.series.length>0"
      key="time"
  ></BaseLineChart>
</template>
<script setup>
import UpLimitFormLine from '@/view/stock/upLimit/UpLimitFormLine'
import BaseLineChart from "@/components/BaseLineChart";

import {ref, reactive, onMounted} from "vue";
import BaseEcharts from "@/module/BaseEcharts";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import EchartsUtils from "@/module/EchartsUtils";


const time = ref()
const showFlag = ref(true)
const showNameOrThemeFlag = ref(false)
const queryParam = reactive({})
const charStyle = {width: '100%', height: '600px'};
const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))
const xAxiosArr = ref([])
const resultRes = ref({data: []})


function refreshEcharts(val) {
  EchartsUtils.clearCache(baseLineEcharts);
  clearSlotCache();
  firstInit();
  baseLineEcharts.xAxis[0].data.length = 0;

  setTimeout(()=>{

    getUpdateOtherInfo();
    getUpdateInfo()
  },1)

  time.value = new Date().getTime();
}

async function getIntervalStatic(queryParamTemp) {
  queryParam.dateStr = queryParamTemp.dateStr;
  EchartsUtils.clearCache(baseLineEcharts);
  clearSlotCache();
  firstInit();
  await getAllStockInfoByDate()
  xAxiosArr.value.forEach(v => {
    baseLineEcharts.xAxis[0].data.push(v);
  })
  time.value = new Date().getTime();
}

function getAllStockInfoByDate() {

  axios.post(AxiosUrl.river.intervalTime.getTimeList, {
    intervalType: 1
  }).then((res) => {
    baseLineEcharts.xAxis[0].data.length = 0;
    xAxiosArr.value.length = 0;
    xAxiosArr.value = res;
    getUpdateOtherInfo();
  });
  axios.post(AxiosUrl.stock.stockQuery.strategy, {
    dateStr: queryParam == null || queryParam.dateStr == null || queryParam.dateStr.length === 0 ? ConfigInfo.nowDate : queryParam.dateStr,
    riverStockTemplateSign: 'FIRST_UP_LIMIT_EQUAL_ABOVE',
  }).then((res) => {
    resultRes.value.data = res.data;
    getUpdateInfo();
  });
}

function getUpdateOtherInfo() {
  xAxiosArr.value.forEach(v => {
    baseLineEcharts.xAxis[0].data.push(v);
  })
}

function getUpdateInfo(res) {
  let allSeries = [];
  let resTemp = {}
  if (res) {
    resTemp = res;
  } else {
    resTemp = resultRes.value;
  }
  if (!resTemp.data) {
    return;
  }
  resTemp.data.forEach(v => {
    let dataIndex = [];
    dataIndex.push(v.首次涨停时间.substr(0, 5));
    dataIndex.push(v.首次涨停时间.substr(6, 2));
    dataIndex.push(v.code);
    dataIndex.push(v.股票简称);
    Object.keys(v).forEach(key => {
      if (key.indexOf('涨停原因类别') > -1
      ) {
        dataIndex.push(v[key].split('+')[0]);
      }
    });
    Object.keys(v).forEach(key => {
      if (key.indexOf('总市值') > -1
      ) {
        dataIndex.push(v[key]);
      }
    });
    Object.keys(v).forEach(key => {
      if (key.indexOf('成交额') > -1
      ) {
        dataIndex.push(v[key]);
      }
    });
    dataIndex.push(v.封单范围);

    allSeries.push(dataIndex);
  })
  baseLineEcharts.series.length = 0;
  let serviceIndex = {
    type: 'scatter',
    label: {
      normal: {
        //标签位置
        position: 'inside',
        //是否显示标签
        show: showFlag.value,
        align: 'center',
        width: 18,
        overflow: 'break',
        formatter: function (params) {
          if (showNameOrThemeFlag.value) {
            debugger
            return params.data[4];
          } else {
            debugger
            return params.data[3];
          }
        },
        borderColor: '#555',
        shadowColor: '#888',
        textBorderColor: '#000',

        backgroundColor: '#eee',
        fontSize: 18,
        color: 'rgba(234,8,8,0.86)'
      }
    },
    itemStyle: {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(196,46,46,0.3)'
    },
    data: allSeries
  }
  baseLineEcharts.series.push(serviceIndex);
}


function clearSlotCache() {
  baseLineEcharts.axisPointer = {}
}

function firstInit() {

  setTooltip()


  setYaxis();

  baseLineEcharts.dataZoom.length = 0;
  baseLineEcharts.dataZoom = [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    },
    {
      type: 'inside',
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    }
  ]

}

function setTooltip() {
  const schema = [
    {name: '时间', index: 0, text: '时间'},
    {name: '秒', index: 1, text: '秒'},
    {name: '股票代码', index: 2, text: '股票代码'},
    {name: '股票名称', index: 3, text: '股票名称'},
    {name: '模板id', index: 4, text: '模板id'},
    {name: '模板名称', index: 5, text: '模板名称'},
  ];
  baseLineEcharts.tooltip = {
    backgroundColor: 'rgb(234,198,179)',
    formatter: function (param) {
      var value = param.value;
      // prettier-ignore
      return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
          + value[0] + '日：'
          + '</div>'
          + schema[1].text + '：' + value[1] + '<br>'
          + schema[2].text + '：' + value[2] + '<br>'
          + schema[3].text + '：' + value[3] + '<br>'
          + schema[4].text + '：' + value[4] + '<br>'
          + schema[5].text + '：' + value[5] + '<br>';
    }
  }

}


function setYaxis() {
  let yAxisIndex1 = {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',
      }
    },
    axisLabel: {
      formatter: function (value, index) {
        return value;
      }
    },
  }

  baseLineEcharts.yAxis = [];
  baseLineEcharts.yAxis.push(yAxisIndex1);
}

onMounted(() => {

})
</script>
