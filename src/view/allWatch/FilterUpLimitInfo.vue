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
            @change="filterStockInfo"
        />
      </el-form-item>
      <el-form-item>
        <span style="font-size: 30px;">  {{ simHisTimeStr }}</span>
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
                   v-for="item in stockInfoArr "></StockBaseInfo>
  </div>


</template>

<script>
import {ref} from "vue";
import UpLimitDayStatic from '@/view/stock/UpLimitDayStatic'
import UpLimitStatic from '@/view/stock/UpLimitStatic'
import StockBaseInfo from '@/view/allWatch/StockBaseInfo'
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'


import {onMounted} from "vue";
import moment from "moment";
import router from "@/config/router";
import BaseUpLimitInfo from '@/view/allWatch/BaseUpLimitInfo'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name: 'openWatch3.vue',
  components: {UpLimitDayStatic, UpLimitStatic, StockBaseInfo, EmotionFormLine},


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
      stockInfoArr,
      stockThemeMap,
      stockCodeMap,
      simHisTimeStr,
      time,
    } = BaseUpLimitInfo(queryRef, styleInfo)


    const refreshDateJobId = ref()
    const refreshSpeedJobId = ref()
    const refreshValueJobId = ref()
    const showInfo = ref({
      tradeButton: true,
      baseButton: true,
      timeStr: true,
    })

    function setvalue() {
      timeStr.value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
    }

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
      simHisTimeStr.value = '09:25'
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
      stockThemeMap,
      showTheme,
      styleInfo,
      deleteFilterTheme, saveFilterDate,
      filterStockInfo,
      time,
      showInfo,
      clickTheme, refreshDateJob, refreshSpeedJob, refreshValueJob,
      refreshDateJobId, refreshSpeedJobId, refreshValueJobId,
      getIntervalStatic, queryRef, simHisTimeStr
    }
  }
}
</script>

<style scoped>

</style>
