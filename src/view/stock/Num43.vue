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
    <el-form-item>
      <el-switch
          v-model="showLegendFlag"
          class="ml-2"
          size="large"
          active-text="是否显示"
          @change="refreshEcharts"
      />
    </el-form-item>
    <el-form-item>
      <el-button
          type="success" @click="reduceWidth"
      >减少宽度
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
          type="success" @click="addWidth"
      >增加宽度
      </el-button>
    </el-form-item>
  </el-form>
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
import StockInfoUtil from "@/constant/StockInfoUtil";


const queryRef = ref()
const upLimitThemeList = ref([])
const time = ref()
const showFlag = ref(true)
const showNameOrThemeFlag = ref(false)
const showLegendFlag = ref(false)

const queryParam = reactive({})
const charStyle = reactive({width: '100%', height: '600px'});
const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))
const xAxiosArr = ref([])
const resultRes = ref({data: []})


async function refreshEcharts() {
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

async function getIntervalStatic(queryParamTemp) {
  queryParam.dateStr = queryParamTemp.dateStr;
  EchartsUtils.clearCache(baseLineEcharts);
  clearSlotCache();
  firstInit();
  await getAllStockInfoByDate()
  await getThemeInfo();
  baseLineEcharts.xAxis[0].data = [];
  baseLineEcharts.xAxis[0].data = Object.assign([], xAxiosArr.value);
  getUpdateInfo()
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

async function getAllStockInfoByDate() {

  await axios.post(AxiosUrl.river.intervalTime.getTimeList, {
    intervalType: 1
  }).then(async (res) => {
    baseLineEcharts.xAxis[0].data.length = 0;
    xAxiosArr.value.length = 0;
    xAxiosArr.value = res;
    res.forEach(v => {
      baseLineEcharts.xAxis[0].data.push(v);
    })
  });
  await axios.post(AxiosUrl.stock.stockQuery.strategy, {
    dateStr: queryParam == null || queryParam.dateStr == null || queryParam.dateStr.length === 0 ? ConfigInfo.nowDate : queryParam.dateStr,
    riverStockTemplateSign: 'FIRST_UP_LIMIT_EQUAL_ABOVE',
  }).then((res) => {
    resultRes.value.data = res.data;
  });
}

function getUpdateInfo(res) {
  let resTemp = {}
  if (res) {
    resTemp = res;
  } else {
    resTemp = resultRes.value;
  }
  if (!resTemp.data) {
    return;
  }

  baseLineEcharts.series.length = 0;
  let filter = upLimitThemeList.value.filter(item => item.num > 1);
  filter.forEach(v => {
    let allSeries = [];
    v.nameList.forEach(item=>{
      let find = resTemp.data.find(resIndex=>item.code==resIndex.code);
      let dataArr = getDataArr(find);
      allSeries.push(dataArr);
    })
    baseLineEcharts.legend. selected[v.themeName+v.num]=showLegendFlag.value;
    let serviceIndex = {
      name: v.themeName+v.num,
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
              return params.data[4];
            } else {
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


  })


}


function getDataArr(v){
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
    if (key.indexOf('市值') > -1
    ) {
      dataIndex.push(StockInfoUtil.forMatMoneyNum(v[key]));
    }
  });
  Object.keys(v).forEach(key => {
    if (key.indexOf('成交额') > -1
    ) {
      dataIndex.push(StockInfoUtil.forMatMoneyNum(v[key]));
    }
  });
  Object.keys(v).forEach(key => {
    if (key.indexOf('换手率') > -1
    ) {
      dataIndex.push(StockInfoUtil.forMatIncreaseRate(v[key]));
    }
  });
  dataIndex.push(v.封单范围);
  dataIndex.push(v.打开涨停次数);
  dataIndex.push(v.所属同花顺行业);
  return dataIndex;
}



function clearSlotCache() {
  baseLineEcharts.axisPointer = {}
}

function firstInit() {

  setTooltip()


  setYaxis();

  setLegend();
  // setDatazoom();

}


function setTooltip() {
  const schema = [
    {name: '时间', index: 0, text: '时间'},
    {name: '秒', index: 1, text: '秒'},
    {name: '股票代码', index: 2, text: '股票代码'},
    {name: '股票名称', index: 3, text: '股票名称'},
    {name: '涨停题材', index: 4, text: '涨停题材'},
    {name: '总市值', index: 5, text: '总市值'},
    {name: '成交额', index: 6, text: '成交额'},
    {name: '换手率', index: 7, text: '换手率'},
    {name: '封单量', index: 8, text: '封单量'},
    {name: '打开涨停次数', index: 9, text: '打开涨停次数'},
    {name: '所属行业', index: 10, text: '所属行业'},

  ];
  baseLineEcharts.tooltip = {
    backgroundColor: 'rgb(234,198,179)',
    formatter: function (param) {
      var value = param.value;
      // prettier-ignore
      return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
          + '</div>'
          + schema[2].text + '：' + value[2] + '<br>'
          + schema[3].text + '：' + value[3] + '<br>'
          + schema[4].text + '：' + value[4] + '<br>'
          + schema[5].text + '：' + value[5] + '<br>'
          + schema[6].text + '：' + value[6] + '<br>'
          + schema[7].text + '：' + value[7] + '<br>'
          + schema[8].text + '：' + value[8] + '<br>'
          + schema[9].text + '：' + value[9] + '<br>'
          + schema[10].text + '：' + value[10] + '<br>'
          ;
    }
  }

}

function setLegend(){
  baseLineEcharts.legend. width="1400px";
  baseLineEcharts.legend.  left= "100px";
  baseLineEcharts.legend.  inactiveColor="rgb(227,183,38)"

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

async function getThemeInfo() {

    await axios.post(AxiosUrl.stock.specialStrategy.getUpLimitTheme, {
      riverStockTemplateSign: 'FIRST_UP_LIMIT_EQUAL_ABOVE',
      dateStr: queryRef.value && queryRef.value.queryParam && queryRef.value.queryParam.dateStr ? queryRef.value.queryParam.dateStr : ConfigInfo.nowDate
    }).then((res) => {
      upLimitThemeList.value = res;
    });


}

onMounted(() => {

})
</script>
