<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @query="getIntervalStatic"
  ></EmotionFormLine>

  <el-row :gutter="20">
    <el-col :span="12">
      <div>
        <el-badge
            :value="item[1]"
            v-for="item in twoStockThemeMap"
        >
          <el-tag style="margin:5px;font-size: 20px " type='success'
                  size="medium"
                  @click="clickTheme(item[0])"
                  @mouseover="showTheme(item[0])"
          >{{ item[0] }}
          </el-tag>
        </el-badge>
        <div>昨日连板</div>
        <LastTwoAboveUpLimitStatic :date-str="currDateStr"
                                   :tooltip-disable="true"
                                   :theme-stock-arr="allThemeStockArr"
                                   :describe-arr="describeArr"
                                   :up-limit-list="upLimitList"
                                   :key="time1">
        </LastTwoAboveUpLimitStatic>
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <el-badge
            :value="item[1]"
            v-for="item in oneStockThemeMap"
        >
          <el-tag style="margin:5px;font-size: 20px" type='success'
                  size="medium"
                  @click="clickTheme(item[0])"
                  @mouseover="showTheme(item[0])"
          >{{ item[0] }}
          </el-tag>
        </el-badge>
      </div>
      <div>
        <div key="time2">
          一进二
          <el-tag :style="getOneHoverStyle(item[0])" type='warning'
                  size="medium"
                  v-for="item in oneStockNameMap"
          >{{ item[0] }}
          </el-tag>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-scrollbar max-height="400px">

    <BaseLineChart
        :base-line-echarts="baseLineEcharts"
        :char-style="charStyle"
        v-if=" baseLineEcharts.series.length>0"
    ></BaseLineChart>
    <BaseLineChart
        :base-line-echarts="baseLineEcharts"
        :char-style="charStyle"
        v-if=" baseLineEcharts.series.length>0"
    ></BaseLineChart>
    <BaseLineChart
        :base-line-echarts="baseLineEcharts"
        :char-style="charStyle"
        v-if=" baseLineEcharts.series.length>0"
    ></BaseLineChart>
  </el-scrollbar>
  <div>
    <el-tag type="danger">{{ currTheme }}</el-tag>
    <el-tag type="success" v-for="item in twoThemeStockMap"
    >{{ item[0] }}
    </el-tag>
    <el-switch
        v-model="queryParam.value1"
        class="ml-2"
        size="large"
        active-text="定时刷新"
        @change="refreshDateJob"
    />
    <span>||</span>
    <el-tag type="success" v-for="item in oneThemeStockMap"
    >{{ item[0] }}
    </el-tag>


  </div>
  <div>
    <TemplateTableInfo
        :table-data="tableData"
        :table-prop="tableProp"
        :key="time">
    </TemplateTableInfo>

  </div>


</template>

<script>
import {ref} from "vue";

import StockBaseInfoObject from "@/module/StockBaseInfo";
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import TemplateTableInfo from '@/view/stock/TemplateTableInfo'
import LastTwoAboveUpLimitStatic from '@/view/stock/LastTwoAboveUpLimitStatic'


import {onMounted} from "vue";
import moment from "moment";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import router from "@/config/router";
import {reactive} from "vue";
import BaseLineChart from "@/components/BaseLineChart";

import BaseEcharts from "@/module/BaseEcharts";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import ConfigInfo from "@/constant/ConfigInfo";
import EchartsUtils from "@/module/EchartsUtils";

export default {
  name: 'openWatch3.vue',
  components: {EmotionFormLine, TemplateTableInfo, LastTwoAboveUpLimitStatic,BaseLineChart},


  setup(props, context) {
    const queryParam = ref({})
    const queryRef = ref({})

    const tableData = ref([])
    const tableProp = ref([])
    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))
    const charStyle = reactive({width: '100%', height: '200px'})

    const upLimitList = ref([])
    const describeArr = ref([])
    //key题材 value数量
    const oneStockThemeMap = ref(new Map())
    //key题材 value所有信息
    const oneStockThemeInfoMap = ref(new Map())

    //key题材 value数量
    const twoStockThemeMap = ref(new Map())
    //key题材 value所有信息
    const twoStockThemeInfoMap = ref(new Map())
    //传入的参数
    const allThemeStockArr = ref([])
    //题材对应的股票
    const oneThemeStockMap = ref(new Map())
    const twoThemeStockMap = ref(new Map())

    //一进二 股票名称
    const oneStockNameMap = ref(new Map())

    const currTheme = ref()
    const hoverTheme = ref()


    const refreshDateJobId = ref()
    const currDateStr = ref()
    const templateTableQueryParam = ref({
      id: '1520443939201613824',
      dateStr: '',
      themeStr: '',
    })

    const time = ref()
    const time1 = ref()
    const time2 = ref()

    const timeStr = ref()

    function setvalue() {
      timeStr.value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
    }

    /**
     * 一进二
     */
    function getOneToTwoStockInfoArr() {
      if (!queryRef.value.queryParam) {
        return;
      }
      oneStockThemeMap.value = new Map()
      oneStockNameMap.value = new Map();
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId: '1506450265249808384',
        dateStr: queryRef.value.queryParam.dateStr
      }).then((res) => {
        res.data.forEach(item => {
          let stockInfo = getStockInfo(item);
          oneStockNameMap.value.set(stockInfo.name);
          if (stockInfo.theme.indexOf("+" > -1)) {
            let strings = stockInfo.theme.split("+");
            strings.forEach(themeTemp => {
              if (oneStockThemeMap.value.has(themeTemp)) {
                oneStockThemeMap.value.set(themeTemp, oneStockThemeMap.value.get(themeTemp) + 1);
                oneStockThemeInfoMap.value.get(themeTemp).push(stockInfo);
              } else {
                oneStockThemeMap.value.set(themeTemp, 1);
                let themeInfoTemp = []
                themeInfoTemp.push(stockInfo);
                oneStockThemeInfoMap.value.set(themeTemp, themeInfoTemp);

              }
            })
          } else if (stockInfo.theme) {
            if (oneStockThemeMap.value.has(stockInfo.theme)) {
              oneStockThemeMap.value.set(stockInfo.theme, oneStockThemeMap.value.get(stockInfo.theme) + 1);
              oneStockThemeInfoMap.value.get(stockInfo.theme).push(stockInfo);

            } else {
              oneStockThemeMap.value.set(stockInfo.theme, 1);
              let themeInfoTemp = []
              themeInfoTemp.push(stockInfo);
              oneStockThemeInfoMap.value.set(stockInfo.theme, themeInfoTemp);

            }
          }
        })
      });
    }


    /**
     * 二板以上
     */
    function getTwoAboveStockInfoArr() {
      if (!queryRef.value.queryParam) {
        return;
      }
      twoStockThemeMap.value = new Map()
      twoStockThemeInfoMap.value = new Map()
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId: '1481302460344696832',
        dateStr: queryRef.value.queryParam.dateStr
      }).then((res) => {
        res.data.forEach(item => {
          let stockInfo = getStockInfo(item);
          if (stockInfo.theme.indexOf("+" > -1)) {
            let strings = stockInfo.theme.split("+");
            strings.forEach(themeTemp => {
              if (twoStockThemeMap.value.has(themeTemp)) {
                twoStockThemeMap.value.set(themeTemp, twoStockThemeMap.value.get(themeTemp) + 1);
                twoStockThemeInfoMap.value.get(themeTemp).push(stockInfo);
              } else {
                twoStockThemeMap.value.set(themeTemp, 1);
                let themeInfoTemp = []
                themeInfoTemp.push(stockInfo);
                twoStockThemeInfoMap.value.set(themeTemp, themeInfoTemp);
              }
            })
          } else if (stockInfo.theme) {
            if (twoStockThemeMap.value.has(stockInfo.theme)) {
              twoStockThemeMap.value.set(stockInfo.theme, twoStockThemeMap.value.get(stockInfo.theme) + 1);
              twoStockThemeInfoMap.value.get(stockInfo.theme).push(stockInfo);

            } else {
              twoStockThemeMap.value.set(stockInfo.theme, 1);
              let themeInfoTemp = []
              themeInfoTemp.push(stockInfo);
              twoStockThemeInfoMap.value.set(stockInfo.theme, themeInfoTemp);
            }
          }
        })
      });
    }


    function getStockInfo(stockDetailIndex) {
      let dateStr = queryRef.value.queryParam.dateStr.replaceAll("-", "");
      let stockInfo = new StockBaseInfoObject();
      Object.keys(stockDetailIndex).forEach(key => {
        if (key == '封单范围') {
          stockInfo.upLimitVolRange = stockDetailIndex[key];
        }
        if (key == '首次封单差值') {
          stockInfo.upLimitMixSubVolRange = stockDetailIndex[key];
        }
        if (key == '有效封单差值') {
          stockInfo.upLimitMaxSubVolRange = stockDetailIndex[key];
        }
        if (key == '打开涨停次数') {
          stockInfo.upLimitOpenNum = stockDetailIndex[key];
        }
        if (key == '涨停强弱概览') {
          stockInfo.upLimitDetail = stockDetailIndex[key];
        }
        if (key == 'code') {
          stockInfo.code = stockDetailIndex[key];
        }
        if (key == '股票简称') {
          stockInfo.name = stockDetailIndex[key];
        }


        if (key.indexOf('竞价涨幅') > -1 && key.indexOf(dateStr) > -1
        ) {
          stockInfo.auctionIncreaseRate = stockDetailIndex[key];
        }

        if (key.indexOf('涨跌幅') > -1 && key.indexOf(dateStr) > -1
        ) {
          stockInfo.newIncreaseRate = stockDetailIndex[key];
        }
        if (key.indexOf('竞价金额') > -1 && key.indexOf(dateStr) && key.indexOf('{/}') < 0
        ) {
          stockInfo.auctionTradeAmount = stockDetailIndex[key];
        }
        if (key.indexOf('成交额') > -1 && key.indexOf(dateStr) && key.indexOf('{/}') < 0
        ) {
          stockInfo.tradeAmount = stockDetailIndex[key];
        }
        if (key.indexOf('分时换手率') > -1 && key.indexOf(dateStr) > -1
        ) {
          stockInfo.auctionTurnOverRate = stockDetailIndex[key];
        }
        if (key.indexOf('总市值') > -1 && key.indexOf(dateStr) > -1
        ) {
          stockInfo.marketValue = stockDetailIndex[key];
        }
        if (key.indexOf('市值') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('总') < 0
        ) {
          stockInfo.circulationMarketValue = stockDetailIndex[key];
        }
        if (key.indexOf('涨停原因类别') > -1
        ) {
          stockInfo.theme = stockDetailIndex[key];
        }
        if (key.indexOf('换手率') > -1 && key.indexOf(dateStr) > -1 && key.indexOf('分时') < 0
        ) {
          stockInfo.turnOverRate = stockDetailIndex[key];
        }
        if (key.indexOf('收盘价') > -1 && key.indexOf(dateStr) > -1
        ) {
          stockInfo.newPrice = stockDetailIndex[key];
        }

      });
      stockInfo.subIncreaseRate = stockInfo.newIncreaseRate - stockInfo.auctionIncreaseRate;
      return stockInfo;
    }

    function refreshDateJob(val) {
      if (val) {
        refreshDateJobId.value = setInterval(getUpdateStockInfoArr, 2000);
      } else {
        clearInterval(refreshDateJobId.value); //清除计时器
        refreshDateJobId.value = null; //设置为null
      }
    }

    function getUpdateStockInfoArr() {
      getAllStockInfo();
      time.value = new Date().getTime();
    }

    function getIntervalStatic() {
      if (queryRef.value.queryParam) {
        currDateStr.value = queryRef.value.queryParam.dateStr;
      }
      getOneToTwoStockInfoArr();
      getTwoAboveStockInfoArr();
      getUpLimitInfo();
      time1.value = new Date().getTime();
      time2.value = new Date().getTime();

    }

    const showInfo = ref({
      tradeButton: true,
      baseButton: true,
      timeStr: true,
    })

    function getAllStockInfo() {

      let convert = '';
      if (templateTableQueryParam.value.id != null) {
        if (typeof (templateTableQueryParam.value.id) == 'object') {
          convert = templateTableQueryParam.value.id.join();
        }
        if (typeof (templateTableQueryParam.value.id) == 'string') {
          convert = templateTableQueryParam.value.id;
        }
      }
      if (templateTableQueryParam.value.id == null || templateTableQueryParam.value.dateStr == null || templateTableQueryParam.value.dateStr.length == 0) {
        return;
      }
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId: templateTableQueryParam.value.id == null ? '1481302460344696832' : convert,
        dateStr: templateTableQueryParam.value.dateStr,
        timeStr: templateTableQueryParam.value.timeStr,
        stockCode: templateTableQueryParam.value.stockCode,
        themeStr: templateTableQueryParam.value.themeStr,

      }).then((res) => {
        if (res.data) {
          let datum = res.data[0];
          if (!datum) {
            return;
          }
          tableData.value.length = 0;
          tableProp.value.length = 0;
          let keyArr = []
          Object.keys(datum).forEach(key => {
            keyArr.push(key)
          })
          sortArr(keyArr, 'code', 'market_code');
          sortArr(keyArr, '股票简称');
          sortArr(keyArr, '涨停强弱概览');
          sortArr(keyArr, '封单范围');
          sortArr(keyArr, '首次封单差值');
          sortArr(keyArr, '有效封单差值');
          sortArr(keyArr, '打开涨停次数');
          sortArr(keyArr, '封单比率');
          sortArr(keyArr, '首次涨停时间');
          sortArr(keyArr, '竞价涨幅');
          sortArr(keyArr, '竞价金额', '{*}');
          sortArr(keyArr, '竞价金额', '{/}');
          sortArr(keyArr, '{/}');
          sortArr(keyArr, '涨幅');
          sortArr(keyArr, '成交额');
          sortArr(keyArr, '涨跌幅');
          sortArr(keyArr, '换手率');
          sortArr(keyArr, '市值');
          sortArr(keyArr, '振幅');
          sortArr(keyArr, '时间');
          sortArr(keyArr, '封单额');
          sortArr(keyArr, '封单量');

          keyArr.forEach(key => {
            let propInfo = {
              prop: key,
              label: key,
            }
            tableProp.value.push(propInfo);
          })


          tableData.value = res.data
        }
      });
    }

    function sortArr(keyArr, keyName, notKeyName) {
      while (true) {
        let index;
        if (notKeyName) {
          index = keyArr.findIndex(key => key.indexOf(keyName) != -1 && key.indexOf(notKeyName) == -1)
        } else {
          index = keyArr.findIndex(key => key.indexOf(keyName) != -1)
        }
        if (index > 0) {
          let propInfo = {
            prop: keyArr[index],
            label: keyArr[index],
          }
          tableProp.value.push(propInfo);
          keyArr.splice(index, 1);
        } else {
          break;
        }
      }
    }


    function clickTheme(key) {
      templateTableQueryParam.value.themeStr = key;
      templateTableQueryParam.value.dateStr = queryRef.value.queryParam.dateStr;
      currTheme.value = key;
      oneThemeStockMap.value = new Map();
      twoThemeStockMap.value = new Map();
      if (oneStockThemeInfoMap.value.get(key)) {
        oneStockThemeInfoMap.value.get(key).forEach(item => {
          oneThemeStockMap.value.set(item.name);
        })
      }
      if (twoStockThemeInfoMap.value.get(key)) {
        twoStockThemeInfoMap.value.get(key).forEach(item => {
          twoThemeStockMap.value.set(item.name);
        })
      }
      getAllStockInfo();
      getAllStockInfoByDate();
      time.value = new Date().getTime();
    }
    function getAllStockInfoByDate() {
      if (!queryRef.value.queryParam) {
        return;
      }
      EchartsUtils.clearCache(baseLineEcharts);
      baseLineEcharts.legend.selected = {
        '中位数': true,
        '标准差': true,
        '竞价金额平均值': false,
        '成交额平均值': false,
        '涨跌幅平均值': false,
      }
      axios.post(AxiosUrl.stock.themeStatic.getRangeStatic, {
        beginDate:ConfigInfo.getBeforeEndDayStr(queryRef.value.queryParam.dateStr,30),
        endDate: queryRef.value.queryParam.dateStr,
        objectEnumSign: 'THEME_AUCTION',
        themeStr:currTheme.value
      }).then((res) => {
        res.forEach(obj => {
          baseLineEcharts.xAxis[0].data.push(obj.date)
          JSON.parse(obj.objectStaticArray).forEach(v => {

            let seriesIndex = baseLineEcharts.series.find(item=>item.name==v.name);
            if(seriesIndex){
              seriesIndex.data.push(v.value);
            }else {
              let seriesIndexDateArr=[]
              seriesIndexDateArr.push(v.value);
              let medianArrayObject = {
                name: v.name,
                type: 'line',
                data: seriesIndexDateArr
              }
              baseLineEcharts.series.push(medianArrayObject);
            }
          })
        })

      });
    }

    function getUpLimitInfo() {
      if (!queryRef.value.queryParam) {
        return;
      }
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryRef.value.queryParam.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((lastDay) => {
        upLimitList.value.length = 0
        axios.post(AxiosUrl.stock.specialStrategy.getUpLimitInfo, {
          dateStr: lastDay
        }).then((res) => {
          upLimitList.value = res;
        });
      });
    }


    function showTheme(key) {
      hoverTheme.value = key;
      allThemeStockArr.value.length = 0;
      let newVar1 = twoStockThemeInfoMap.value.get(key);
      if (newVar1) {
        newVar1.forEach(item => {
          allThemeStockArr.value.push(item);
        })
      }
      time1.value = new Date().getTime();

      let newVar = oneStockThemeInfoMap.value.get(key);
      if (newVar) {
        newVar.forEach(item => {
          allThemeStockArr.value.push(item);
        })
      }
      time2.value = new Date().getTime();

    }

    function getOneHoverStyle(name) {
      let defaultStyle = {margin: '5px', fontSize: '20px',}

      let find = allThemeStockArr.value.find(item => item.name == name);
      if (find) {
        return Object.assign(defaultStyle, {backgroundColor: '#ce1121'});
      } else {
        return defaultStyle;
      }
    }

    onMounted(() => {
      if (router.currentRoute.value.query.dateStr) {
        queryRef.value.queryParam.dateStr = router.currentRoute.value.query.dateStr
      }
      getOneToTwoStockInfoArr();
      getTwoAboveStockInfoArr();

      currDateStr.value = queryRef.value.queryParam.dateStr;
      getUpLimitInfo();
      time1.value = new Date().getTime();
    })
    return {
      templateTableQueryParam,
      timeStr,
      queryParam,
      getIntervalStatic,
      oneStockThemeMap,
      currTheme,
      twoStockThemeMap,
      time,
      time1,
      showInfo,
      clickTheme,
      showTheme,
      hoverTheme,
      queryRef,
      currDateStr,
      oneStockNameMap,
      oneStockThemeInfoMap,
      twoStockThemeInfoMap,
      oneThemeStockMap,
      twoThemeStockMap,
      getUpLimitInfo,
      time2,
      getOneHoverStyle,
      allThemeStockArr,
      describeArr,
      upLimitList,
      refreshDateJobId,
      refreshDateJob,
      tableData,
      tableProp,
      getAllStockInfo,
      baseLineEcharts, charStyle,getAllStockInfoByDate
    }
  }
}
</script>

<style scoped>

</style>
