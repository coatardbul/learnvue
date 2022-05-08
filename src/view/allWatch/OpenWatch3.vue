<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @query="getIntervalStatic"
  ></EmotionFormLine>
  <div style="margin-left: 30%">
    <el-form :inline="true" :model="queryParam" class="demo-form-inline">
      <el-form-item>
        <el-switch
            v-model="queryParam.value1"
            class="ml-2"
            size="large"
            active-text="定时刷新"
            @change="refreshDateJob"
        />
      </el-form-item>
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
            v-model="queryParam.value3"
            class="ml-2"
            size="large"
            active-text="涨幅排序"
            @change="refreshValueJob"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.filterStockInfoFlag"
            class="ml-2"
            size="large"
            active-text="过滤数据"
            @change="filterCallAuctionStockInfo"
        />
      </el-form-item>
      <el-form-item>
        <span style="font-size: 30px;">  {{ timeStr }}</span>
      </el-form-item>
    </el-form>

  </div>
  <div>
    <el-badge
        :value="item[1]"
        v-for="item in stockThemeMap"
    >
      <el-tag style="margin:5px;font-size: 20px" closable type='success'
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
import HistoryAuctionSimulate from '@/view/allWatch/HistoryAuctionSimulate'

import {onMounted} from "vue";
import moment from "moment";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import router from "@/config/router";
import BaseUpLimitInfo from "@/view/allWatch/BaseUpLimitInfo";

export default {
  name: 'openWatch3.vue',
  components: {UpLimitDayStatic, UpLimitStatic, StockBaseInfo, EmotionFormLine, HistoryAuctionSimulate},

  setup(props, context) {
    const queryParam = ref({})
    const queryRef = ref({})
    const styleInfo = ref({})
    const timeStr = ref()

    const refreshDateJobId = ref()
    const refreshSpeedJobId = ref()
    const refreshValueJobId = ref()


    const hisNowFlag=ref('now')

    const {
      getStockInfoArr,
      getUpdateStockInfoArr,
      deleteStockInfo,
      deleteTheme,
      sortAndRefresh,
      filterCallAuctionStockInfo,
      clickTheme,
      showTheme,
      stockInfoArr,
      stockThemeMap,
      stockCodeMap,
      time,
    } = BaseUpLimitInfo(queryRef,styleInfo,hisNowFlag)


    function setvalue() {
      timeStr.value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
    }






    const showInfo = ref({
      tradeButton: true,
      baseButton: true,
      timeStr: true,
    })

    function refreshDateJob(val) {
      if (val) {
        refreshDateJobId.value = setInterval(getUpdateStockInfoArr, 2000);
      } else {
        clearInterval(refreshDateJobId.value); //清除计时器
        refreshDateJobId.value = null; //设置为null
      }
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

    function refreshValueJob(val) {
      if (val) {
        refreshValueJobId.value = setInterval(sortAndRefreshValue, 1000);
      } else {
        clearInterval(refreshValueJobId.value); //清除计时器
        refreshValueJobId.value = null; //设置为null
      }
    }

    function sortAndRefreshValue() {
      sortAndRefresh('newIncreaseRate');
    }






    function getIntervalStatic() {
      getStockInfoArr();
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
      deleteStockInfo,
      stockCodeMap,
      getUpdateStockInfoArr,
      filterCallAuctionStockInfo,
      stockThemeMap,
      showTheme,
      hisNowFlag,
      styleInfo,
      deleteTheme,
      time,
      showInfo,
      clickTheme, refreshDateJob, refreshSpeedJob, refreshValueJob,
      refreshDateJobId, refreshSpeedJobId, refreshValueJobId,
      getIntervalStatic, queryRef
    }
  }
}
</script>

<style scoped>

</style>
