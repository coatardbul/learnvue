<template>
  <UpLimitFormLine
      ref="queryRef"
      @query="getIntervalStatic"
  ></UpLimitFormLine>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
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
      <el-switch
          v-model="filterBreakPointFlag"
          class="ml-2"
          size="large"
          active-text="过滤断点"
          @change="refreshEcharts"
      />
    </el-form-item>
    <el-form-item>
      <el-switch
          v-model="filterNumLessTwoFlag"
          class="ml-2"
          size="large"
          active-text="过滤大于"
          @change="refreshEcharts"
      />
    </el-form-item>
    <el-form-item >
      <el-input v-model.number="maxNum" type="number" placeholder=""></el-input>
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


const queryRef = ref()
const upLimitThemeMap = ref(new Map())
const time = ref()
const showLegendFlag = ref(false)
const filterBreakPointFlag = ref(false)
const  filterNumLessTwoFlag=ref(false)
const maxNum=ref(1)
const queryParam = reactive({})
const charStyle = reactive({width: '100%', height: '600px'});
const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))
const xAxiosArr = ref([])


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

function getIntervalStatic(queryParamTemp) {
  queryParam.dateStr = queryParamTemp.dateStr;
  EchartsUtils.clearCache(baseLineEcharts);
  clearSlotCache();
  firstInit();


  baseLineEcharts.xAxis[0].data = [];
  baseLineEcharts.xAxis[0].data = Object.assign([], xAxiosArr.value);
  Promise.all([getAllStockInfoByDate()]).then(values => {
    getUpdateInfo()
  }).catch(reason => {
    console.log(reason)
  });
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
  return new Promise((resolve, reject) => {
    axios.post(AxiosUrl.river.calendar.getDate, {
      beginDate: queryParam == null || queryParam.dateStr == null || queryParam.dateStr.length === 0 ?
          ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate, 15) : ConfigInfo.getBeforeEndDayStr(queryParam.dateStr, 15),
      endDate: queryParam == null || queryParam.dateStr == null || queryParam.dateStr.length === 0 ? ConfigInfo.nowDate : queryParam.dateStr,
      dateProp: 1
    }).then(async (res) => {
      baseLineEcharts.xAxis[0].data.length = 0;
      xAxiosArr.value.length = 0;
      xAxiosArr.value = res;
      res.forEach(v => {
        baseLineEcharts.xAxis[0].data.push(v);
      })
      upLimitThemeMap.value = new Map();
      let num = 0;
      xAxiosArr.value.forEach(dateTime => {
        axios.post(AxiosUrl.stock.specialStrategy.getUpLimitTheme, {
          riverStockTemplateSign: 'FIRST_UP_LIMIT_EQUAL_ABOVE',
          dateStr: dateTime
        }).then((res) => {
          num++;
          upLimitThemeMap.value.set(dateTime, res);
          if (num == xAxiosArr.value.length) {
            resolve();
          }
        }).catch(() => {
          reject();
        });
      })

    });
  })


}

function getUpdateInfo() {
  baseLineEcharts.series.length = 0;
  let index = 0;
  xAxiosArr.value.forEach(dateTimeStr => {
    let themeList = upLimitThemeMap.value.get(dateTimeStr);
    themeList.forEach(themeIndex => {
      baseLineEcharts.legend.selected[themeIndex.themeName] = showLegendFlag.value;
      let find = baseLineEcharts.series.find(seriesIndex => seriesIndex.name == themeIndex.themeName);
      if (find) {
        if (index != find.data.length) {
          for (let i = find.data.length; i < index; i++) {
            find.data.push(null);
          }
        }
        find.data.push(themeIndex.num);
      } else {
        let newArr = []
        if (index != 0) {
          for (let i = 0; i < index; i++) {
            newArr.push(null);
          }
        }
        newArr.push(themeIndex.num);
        let serviceIndex = {
          name: themeIndex.themeName,
          type: 'line',
          data: newArr,
        }
        baseLineEcharts.series.push(serviceIndex);
      }
    })
    index++;
  })
  filterBreakPoint();
  filterNumLessTwo();
}




function filterBreakPoint(){
  if (filterBreakPointFlag.value) {
    let length = baseLineEcharts.series.length;
    while (length > 0) {
      let deleteIndex = -1;
      for (let i = 0; i < baseLineEcharts.series.length; i++) {
        //不连续的点-->true
        let noContinuousPoint = true;
        //找出不连续的点
        for (let j = 0; j < baseLineEcharts.series[i].data.length - 1; j++) {
          if (baseLineEcharts.series[i].data[j] && baseLineEcharts.series[i].data[j + 1]) {
            noContinuousPoint = false;
          }
          if (!noContinuousPoint) {
            break;
          }
        }
        if (noContinuousPoint) {
          deleteIndex = i;
          break;
        }
      }
      if (deleteIndex != -1) {
        //删除对应索引的值
        baseLineEcharts.series.splice(deleteIndex, 1)
      }
      length--;
    }
  }
}
function filterNumLessTwo(){
  if (filterNumLessTwoFlag.value) {
    let length = baseLineEcharts.series.length;
    while (length > 0) {
      let deleteIndex = -1;
      for (let i = 0; i < baseLineEcharts.series.length; i++) {
       let maxNumTemp=0;
        //找出不连续的点
        for (let j = 0; j < baseLineEcharts.series[i].data.length ; j++) {
          if (baseLineEcharts.series[i].data[j] &&  baseLineEcharts.series[i].data[j]>maxNum.value) {
            maxNumTemp=baseLineEcharts.series[i].data[j];
          }
          if(maxNumTemp>maxNum.value){
            break;
          }
        }
        if (maxNumTemp>maxNum.value) {
          maxNumTemp=0;
          continue;
        }else {
          deleteIndex=i;
          break;
        }
      }
      if (deleteIndex != -1) {
        //删除对应索引的值
        baseLineEcharts.series.splice(deleteIndex, 1)
      }
      length--;
    }
  }
}

function clearSlotCache() {
  baseLineEcharts.axisPointer = {}
}

function firstInit() {


  setYaxis();

  setLegend();
  // setDatazoom();

}


function setLegend() {
  baseLineEcharts.legend.width = "1400px";
  baseLineEcharts.legend.left = "100px";
  baseLineEcharts.legend.inactiveColor = "rgb(227,183,38)"

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
