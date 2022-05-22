<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @query="getIntervalStatic"
  ></EmotionFormLine>
  <div style="margin-left: 20%">
    <el-form :inline="true" :model="queryParam" class="demo-form-inline">

      <el-form-item>
        <el-switch
            v-model="queryParam.value2"
            class="ml-2"
            size="large"
            active-text="涨速排序"
            @change="refreshSpeedJob"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.callAuctionTurnOverFlag"
            class="ml-2"
            size="large"
            active-text="竞价换手率排序"
            @change="turnOverSort"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.callAuctionTradeAmountFlag"
            class="ml-2"
            size="large"
            active-text="竞价金额排序"
            @change="tradeAmountSort"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.upLimitVolFlag"
            class="ml-2"
            size="large"
            active-text="封单量排序"
            @change="upLimitVolSort"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.upLimitVolSubFlag"
            class="ml-2"
            size="large"
            active-text="封单量差值排序"
            @change="upLimitVolSubSort"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.filterStockInfoFlag"
            class="ml-2"
            size="large"
            active-text="过滤数据"
            @change="filterStockInfo"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="saveFilterDate">保存现有数据</el-button>
      </el-form-item>
    </el-form>

  </div>
  <div>
    <el-badge
        :value="item[1]"
        v-for="item in stockThemeMap"
    >
      <el-tag style="margin:5px;font-size: 20px" closable type='success'
              size="medium"
              @close="deleteFilterTheme(item[0])"
              @click="clickTheme(item[0])"
              @mouseover="showTheme(item[0])"
      >{{ item[0] }}
      </el-tag>
    </el-badge>

  </div>

  <div :key="time">
    <StockBaseInfo @close="deleteFilterStockInfo" :key="item"
                   :style-info="styleInfo"
                   :stock-info="item"
                   @dialog-form-visible="showDialog"
                   v-for="item in stockInfoArr "></StockBaseInfo>
  </div>

  <el-dialog v-model="dialogFormVisible" title="分时图" append-to-body>
    <ExternalPage :key="time3" :code-str="codeUrl"></ExternalPage>
  </el-dialog>
</template>

<script>
import {ref} from "vue";
import UpLimitDayStatic from '@/view/stock/UpLimitDayStatic'
import UpLimitStatic from '@/view/stock/UpLimitStatic'
import StockBaseInfo from '@/view/allWatch/StockBaseDivInfo'
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import ExternalPage from '@/view/allWatch/ExternalPage'


import {onMounted} from "vue";
import moment from "moment";
import router from "@/config/router";
import BaseUpLimitInfo from '@/view/allWatch/BaseUpLimitInfo'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name: 'openWatch3.vue',
  components: {UpLimitDayStatic, ExternalPage, StockBaseInfo, EmotionFormLine},


  setup(props, context) {
    const queryParam = ref({})
    const queryRef = ref({})
    const styleInfo = ref({})
    const timeStr = ref()
    const {
      getStockInfoArr,
      getUpdateStockInfoArr,
      deleteStockInfo,
      sortAndRefresh,
      clickTheme,
      showTheme,
      addStockCodeMapAndThemeMap,
      clearStockCodeMapAndThemeMap,
      dialogFormVisible,
      stockInfoArr,
      stockThemeMap,
      stockCodeMap,
      time,
    } = BaseUpLimitInfo(queryRef, styleInfo, 'now', queryParam)

    const codeUrl = ref()

    const refreshSpeedJobId = ref()
    const time3 = ref()
    const showInfo = ref({
      tradeButton: true,
      baseButton: true,
      timeStr: true,
    })

    function setvalue() {
      timeStr.value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
    }


    function refreshSpeedJob(val) {
      if (val) {
        refreshSpeedJobId.value = setInterval(sortAndRefreshSpeed, 1000);
      } else {
        clearInterval(refreshSpeedJobId.value); //清除计时器
        refreshSpeedJobId.value = null; //设置为null
      }
    }

    function sortAndRefreshSpeed() {
      sortAndRefresh('subIncreaseRate');
    }

    function showDialog(val) {
      dialogFormVisible.value = true;
      codeUrl.value = val;
      time3.value = new Date().getTime()
    }


    function getIntervalStatic() {
      getStockInfoArr();
    }

    function deleteFilterTheme(theme) {
      stockThemeMap.value.delete(theme)
      while (true) {
        let findIndex = stockInfoArr.value.findIndex(stockInfo => stockInfo.theme.indexOf(theme) > -1);
        if (findIndex > -1) {
          deleteFilterStockInfo(stockInfoArr.value[findIndex]);
        } else {
          break;
        }
      }
    }

    function deleteFilterStockInfo(item) {
      deleteStockInfo(item);
      deleteFilterRequest(item);
    }

    function deleteFilterRequest(item) {
      axios.post(AxiosUrl.stock.stockFilter.delete, {
        templateSign: queryRef.value.queryParam.templateSign,
        date: queryRef.value.queryParam.dateStr,
        stockCode: item.code,
      });
    }


    function filterStockInfo(val) {
      if (val) {
        axios.post(AxiosUrl.stock.stockFilter.getFilterInfo, {
          templateSign: queryRef.value.queryParam.templateSign,
          date: queryRef.value.queryParam.dateStr,
        }).then((res) => {
          stockInfoArr.value = stockInfoArr.value.filter((item) => {
            let findIndex = res.findIndex(stockInfo => stockInfo.stockCode == item.code);
            if (findIndex < 0) {
              return false;
            } else {
              return true;
            }
          })
          clearStockCodeMapAndThemeMap();
          stockInfoArr.value.forEach(item => {
            addStockCodeMapAndThemeMap(item);
          })
        });
      }
    }

    function increaseRateSort(val) {
      if (val) {
        sortAndRefresh('auctionIncreaseRate');
      }
      setTimeout(() => {
        queryParam.value.callAuctionIncreaseRateSortFlag = false;
      }, 3000);
    }

    function turnOverSort(val) {
      if (val) {
        sortAndRefresh('auctionTurnOverRate');
      }
      setTimeout(() => {
        queryParam.value.callAuctionTurnOverFlag = false;
      }, 3000);

    }

    function tradeAmountSort(val) {
      if (val) {
        sortAndRefresh('auctionTradeAmount');
      }
      setTimeout(() => {
        queryParam.value.callAuctionTradeAmountFlag = false;
      }, 3000);
    }

    function upLimitVolSubSort(val) {
      if (val) {
        sortAndRefresh('upLimitMixSubVolRange');
      }
      setTimeout(() => {
        queryParam.value.upLimitVolSubFlag = false;
      }, 3000);
    }

    function upLimitVolSort(val) {
      if (val) {
        sortAndRefresh('upLimitVolRange');
      }
      setTimeout(() => {
        queryParam.value.upLimitVolFlag = false;
      }, 3000);
    }


    function saveFilterDate() {
      axios.post(AxiosUrl.stock.stockFilter.save, {
        templateSign: queryRef.value.queryParam.templateSign,
        date: queryRef.value.queryParam.dateStr,
        stockInfoJson: JSON.stringify(stockInfoArr.value),
      });
    }


    onMounted(() => {
      if (router.currentRoute.value.query.templateSign) {
        queryRef.value.queryParam.templateSign = router.currentRoute.value.query.templateSign
      }
      if (router.currentRoute.value.query.erb) {
        queryRef.value.queryParam.id = router.currentRoute.value.query.erb
      }
      if (router.currentRoute.value.query.dateStr) {
        queryRef.value.queryParam.dateStr = router.currentRoute.value.query.dateStr
      }
      getStockInfoArr()

      setInterval(setvalue, 1);

    })
    return {
      stockInfoArr,
      timeStr,
      queryParam,
      getStockInfoArr,
      deleteFilterStockInfo,
      stockCodeMap,
      getUpdateStockInfoArr,
      increaseRateSort,
      turnOverSort,
      tradeAmountSort,
      upLimitVolSubSort,
      upLimitVolSort,
      stockThemeMap,
      showTheme,
      styleInfo,
      deleteFilterTheme, saveFilterDate,
      filterStockInfo,
      time,
      showInfo,
      codeUrl,
      clickTheme,
      showDialog,
      refreshSpeedJob,
      dialogFormVisible,
      refreshSpeedJobId,
      time3,
      getIntervalStatic, queryRef,
    }
  }
}
</script>

<style scoped>

</style>
