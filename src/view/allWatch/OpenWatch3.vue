<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @query="getIntervalStatic"
  ></EmotionFormLine>
  <div style="font-size: 30px;margin-left: 60%">
    <el-button type="warning">涨速排序</el-button>
    <el-button type="danger">涨幅排序</el-button>
    <span>  {{ timeStr }}</span>
  </div>
  <div>
    <el-badge
        :value="item[1]"
        v-for="item in stockthemeMap"
    >
      <el-tag style="margin:5px;font-size: 20px" closable type='success'
              size="medium"
              @close="deleteTheme(item[0])"
              @click="clickTheme(item[0])"
              @mouseover="showTheme(item[0])"
      >{{ item[0] }}
      </el-tag>
    </el-badge>

  </div>

  <div :key="time">
    <StockBaseInfo @close="deleteStockInfo" :key="item"
                   :style-info="styleInfo"
                   :stock-info="item"
                   v-for="item in stockInfoArr "></StockBaseInfo>
  </div>


</template>

<script>
import {ref} from "vue";
import ConfigInfo from "@/constant/ConfigInfo";
import UpLimitDayStatic from '@/view/stock/UpLimitDayStatic'
import UpLimitStatic from '@/view/stock/UpLimitStatic'
import StockBaseInfo from '@/view/allWatch/StockBaseInfo'
import StockBaseInfoObject from "@/module/StockBaseInfo";
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'


import {onMounted} from "vue";
import moment from "moment";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import router from "@/config/router";

export default {
  name: 'openWatch3.vue',
  components: {UpLimitDayStatic, UpLimitStatic, StockBaseInfo, EmotionFormLine},


  setup(props, context) {
    const queryParam = ref({})
    const queryRef = ref({})
    const stockInfoArr = ref([])
    const stockCodeMap = ref(new Map())
    const stockthemeMap = ref(new Map())
    const time = ref()
    const styleInfo = ref({})
    const timeStr = ref()

    function setvalue() {
      timeStr.value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
    }

    function getStockInfoArr() {
      if (!queryRef.value.queryParam) {
        return
      }
      stockInfoArr.value.length = 0
      stockthemeMap.value = new Map()
      stockCodeMap.value = new Map()
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId: queryRef.value.queryParam.id,
        dateStr: queryRef.value.queryParam.dateStr
      }).then((res) => {
        res.data.forEach(item => {
          let stockInfo = getStockInfo(item);
          stockInfoArr.value.push(stockInfo);
          stockCodeMap.value.set(item.code, stockInfo);
          if (stockInfo.theme.indexOf("+" > -1)) {
            let strings = stockInfo.theme.split("+");
            strings.forEach(themeTemp => {
              if (stockthemeMap.value.has(themeTemp)) {
                stockthemeMap.value.set(themeTemp, stockthemeMap.value.get(themeTemp) + 1);

              } else {
                stockthemeMap.value.set(themeTemp, 1);

              }
            })
          } else if (stockInfo.theme) {
            if (stockthemeMap.value.has(stockInfo.theme)) {
              stockthemeMap.value.set(stockInfo.theme, stockthemeMap.value.get(stockInfo.theme) + 1);
            } else {
              stockthemeMap.value.set(stockInfo.theme, 1);

            }
          }
        })
      });
    }

    function getUpdateStockInfoArr() {
      if (stockInfoArr.value.length > 0) {


        axios.post(AxiosUrl.stock.stockQuery.strategy, {
          riverStockTemplateId: queryRef.value.queryParam.id,
          dateStr: queryRef.value.queryParam.dateStr
        }).then((res) => {
          res.data.forEach(item => {
            let stockInfo = getStockInfo(item);
            if (stockCodeMap.value.has(item.code)) {
              let find1 = stockInfoArr.value.find(stockTemp => stockTemp.code == item.code);
              find1 = Object.assign({}, stockInfo)
            }
          })
        });
      }
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

    function deleteStockInfo(item) {
      let findIndex = stockInfoArr.value.findIndex(stockInfo => stockInfo.code == item.code);
      stockInfoArr.value.splice(findIndex, 1)
      stockCodeMap.value.delete(item.code)
    }

    function deleteTheme(theme) {
      stockthemeMap.value.delete(theme)
      while (true) {
        let findIndex = stockInfoArr.value.findIndex(stockInfo => stockInfo.theme.indexOf(theme) > -1);
        if (findIndex > -1) {
          stockInfoArr.value.splice(findIndex, 1)
        } else {
          break;
        }
      }

    }

    const showInfo = ref({
      tradeButton: true,
      baseButton: true,
      timeStr: true,
    })

    function showTheme(key) {
      styleInfo.value.bigDiv = key;
      time.value = new Date().getTime();
    }

    function clickTheme(key) {
      styleInfo.value.bigDiv = key;
      let hasTheme = []
      let noHasTheme = []
      stockInfoArr.value.forEach(item => {
        if (item.theme.indexOf(key) > -1) {
          hasTheme.push(item);
        } else {
          noHasTheme.push(item);
        }
      })
      stockInfoArr.value.length = 0;
      hasTheme.forEach(item => {
        stockInfoArr.value.push(item);
      })
      noHasTheme.forEach(item => {
        stockInfoArr.value.push(item);
      })
      time.value = new Date().getTime();
    }

    function getIntervalStatic() {
      getStockInfoArr();
    }

    onMounted(() => {
      if (router.currentRoute.value.query.erb) {
        queryRef.value.queryParam.id = router.currentRoute.value.query.erb
      }
      if (router.currentRoute.value.query.dateStr) {
        queryRef.value.queryParam.dateStr = router.currentRoute.value.query.dateStr
      }
      getStockInfoArr()
      setInterval(getUpdateStockInfoArr, 2000);

      setInterval(setvalue, 1);

    })
    return {
      stockInfoArr,
      timeStr,
      queryParam,
      getStockInfoArr,
      deleteStockInfo,
      stockCodeMap,
      getUpdateStockInfoArr,
      stockthemeMap,
      showTheme,
      styleInfo,
      deleteTheme,
      time,
      showInfo,
      clickTheme,
      getIntervalStatic, queryRef
    }
  }
}
</script>

<style scoped>

</style>
