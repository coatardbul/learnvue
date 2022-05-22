<template>
  <UpLimitFormLine
      ref="queryRef"
      @query="getIntervalStatic"
  ></UpLimitFormLine>
  <el-scrollbar>
    <BaseLineChart
        :base-line-echarts="baseLineEcharts"
        :char-style="charStyle"
        v-if="baseLineEcharts.series.length>0"
        :key="time"
    ></BaseLineChart>
  </el-scrollbar>
</template>
<script setup>
import UpLimitFormLine from '@/view/stock/upLimit/UpLimitFormLine'
import BaseLineChart from "@/components/BaseLineChart";

import {ref, reactive, onMounted, nextTick} from "vue";
import BaseEcharts from "@/module/BaseEcharts";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import EchartsUtils from "@/module/EchartsUtils";
import GraphEcharts from "@/module/GraphEcharts";


const time = ref()
const showFlag = ref(true)
const showNameOrThemeFlag = ref(false)
const queryParam = reactive({})
const charStyle = reactive({width: '100%', height: '600px'});
const baseLineEcharts = reactive( new GraphEcharts())
const xAxiosArr = ref([])
const resultRes = ref({data: []})


function refreshEcharts() {
  EchartsUtils.clearCache(baseLineEcharts);
  clearSlotCache();
  firstInit();
  nextTick(() => {
    baseLineEcharts.xAxis[0].data = [];
    baseLineEcharts.xAxis[0].data = Object.assign([], xAxiosArr.value);
    getUpdateInfo()
  })
  time.value = new Date().getTime();
}

function getIntervalStatic(queryParamTemp) {
  queryParam.dateStr = queryParamTemp.dateStr;
  getAllStockInfoByDate()
  time.value = new Date().getTime();

}

function reduceWidth() {
  let width = charStyle.width.split('%')[0];
  let number = Number(width) - 100;
  charStyle.width = number + '%';
  console.log(number);
  time.value = new Date().getTime();

}

function addWidth() {
  let width = charStyle.width.split('%')[0];
  let number = Number(width) + 100;
  charStyle.width = number + '%';
  console.log(number);
  time.value = new Date().getTime();

}

function getAllStockInfoByDate() {

  axios.post(AxiosUrl.stock.stockQuery.strategy, {
    dateStr: queryParam == null || queryParam.dateStr == null || queryParam.dateStr.length === 0 ? ConfigInfo.nowDate : queryParam.dateStr,
    riverStockTemplateSign: 'FIRST_UP_LIMIT_EQUAL_ABOVE',
  }).then((res) => {
    getUpdateInfo(res);
    resultRes.value.data = res.data;
  });
}

function getUpdateInfo(res) {
  const colorList = [
    "#28CAD8",
    "#E5A214",
    "#F69F73",
    "#ff7f50",
    "#87cefa",
    "#da70d6",
    "#32cd32",
    "#6495ed",
    "#ff69b4",
    "#cd5c5c",
    "#1e90ff",
    "#ff6347",
    "#7b68ee",
    "#6b8e23",
    "#4ea397",
    "#b8860b",
    "#7bd9a5",
  ];


  baseLineEcharts.toolbox = {
    feature: {
      restore: {
        show: false,
      },
      dataView: {
        show: false,
      },
      saveAsImage: {
        show: false,
      },
      dataZoom: {
        show: false,
      },
      magicType: {
        show: false,
      },
    },
    itemSize: 18,
    iconStyle: {
      normal: {
        borderColor: "#1990DA",
      },
      emphasis: {
        color: "#d5dfe8",
      },
    },
    top: 25,
    right: 15,
  };


  let serviceIndex = {
        type: "graph",
        layout: "force",
        force: {
          repulsion: 55,
          edgeLength: 10,
        },
        roam: true,
        label: {
          normal: {
            show: true,
            formatter: (p) => {
              debugger
              return p.data.股票简称;
            }
          },
        },
        draggable: true,
        symbolSize: (params) => {
          return 1;
        },
        data: res.data,
      };

  baseLineEcharts.series.push(serviceIndex);

}


function clearSlotCache() {
  baseLineEcharts.axisPointer = {}
}

function firstInit() {

  setTooltip()


  setYaxis();


}


function setTooltip() {


}


function setYaxis() {

}

onMounted(() => {

})
</script>
