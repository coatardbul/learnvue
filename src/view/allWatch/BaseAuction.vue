<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @query="getIntervalStatic"
  ></EmotionFormLine>
  <el-row :gutter="20">
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨停：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.UP_LEVEL_5 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于7：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.UP_LEVEL_4 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于5小于7：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.UP_LEVEL_3 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于3小于5：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.UP_LEVEL_2 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于0小于3：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.UP_LEVEL_1 }}</div>
      </div>
    </el-col>
    <el-col :span="4">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅等于0：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.LEVEL_0 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于-3小于0：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.DOWN_LEVEL_1 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于-5小于-3：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.DOWN_LEVEL_2 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于-7小于-5：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.DOWN_LEVEL_3 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">涨幅大于-7：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.DOWN_LEVEL_4 }}</div>
      </div>
    </el-col>
    <el-col :span="2">
      <div :style="divStyle">
        <div :style="increaseWordStyle">跌停：</div>
        <div :style="increaseNumStyle">{{ increaseNumInfo.DOWN_LEVEL_5 }}</div>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <div>
        喇叭口
        <BaseDayStandardDeviationStatistic :char-style="charStyleDayMedian"
                                           :key="time12"
                                           :begin-date="beginDate"
                                           :end-date="endDate"
        ></BaseDayStandardDeviationStatistic>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="background-color: rgb(236,245,255)">
        晋级率
        <BaseDayUpLimitPromotionStatistic :char-style="charStyleDayMedian"
                                          :key="time12"
                                          :begin-date="beginDate"
                                          :end-date="endDate">
        </BaseDayUpLimitPromotionStatistic>
      </div>
    </el-col>
  </el-row>
  <div>量比中位数{{ volRateMedian }}---{{ volRateMedianFenshi }}</div>
  <div>量比标准差{{ volRateStd }}---{{ volRateStdFenshi }}</div>
  <div style="margin-left: 1%">
    <el-form :inline="true" :model="queryParam" class="demo-form-inline">
      <el-form-item>
        <span style="width:380px; font-size: 30px;">  {{ isNowRequest() ? timeStr : simHisTimeStr }}</span>
      </el-form-item>
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
            v-model="queryParam.IncreaseSpeedFlag"
            class="ml-2"
            size="large"
            active-text="涨速排序"
            @change="refreshSpeedJob"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
            v-model="queryParam.increaseRateFlag"
            class="ml-2"
            size="large"
            active-text="涨幅排序"
            @change="refreshValueJob"
        />
      </el-form-item>

      <el-form-item>
        <el-switch
            v-model="queryParam.callAuctionIncreaseRateSortFlag"
            class="ml-2"
            size="large"
            active-text="竞价涨幅排序"
            @change="increaseRateSort"
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
        <el-button type="text" @click="dragonTiger"
        >刷新五虎
        </el-button>
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

    </el-form>

  </div>
  <div>
    <el-badge
        :value="item[1]"
        v-for="item in stockThemeMap"
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
                   @dialog-form-visible="showDialog"
                   v-for="item in stockInfoArr "></StockBaseInfo>
  </div>
  <el-dialog v-model="dialogFormVisible" title="分时图" append-to-body>
    <ExternalPage :key="time3" :code-str="codeUrl"></ExternalPage>
  </el-dialog>
</template>

<script>
import {computed, ref} from "vue";
import UpLimitDayStatic from '@/view/stock/UpLimitDayStatic'
import UpLimitStatic from '@/view/stock/UpLimitStatic'
import StockBaseInfo from '@/view/allWatch/StockBaseDivInfo'
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import BaseDayUpLimitPromotionStatistic from '@/view/stock/BaseDayUpLimitPromotionStatistic'

import {onMounted} from "vue";
import moment from "moment";
import router from "@/config/router";
import ExternalPage from '@/view/allWatch/ExternalPage'
import BaseUpLimitInfo from '@/view/allWatch/BaseUpLimitInfo'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import RebuildBaseUpLimitInfo from "@/view/allWatch/RebuildBaseUpLimitInfo";
import {reactive} from "vue";

export default {
  name: 'historyAuctionSimulate.vue',
  components: {UpLimitDayStatic, UpLimitStatic, StockBaseInfo, EmotionFormLine, ExternalPage,BaseDayStandardDeviationStatistic,BaseDayUpLimitPromotionStatistic},

  props: {
    hisNowFlag: {
      type: String,
    }
  },

  setup(props, context) {
    const queryParam = ref({})
    const queryRef = ref({})
    const styleInfo = ref({})
    const time3 = ref()
    const time12 = ref()

    const codeUrl = ref()
    const timeStr = ref()

    const {
      getStockInfoArr,
      dialogFormVisible,
      getUpdateStockInfoArr,
      deleteStockInfo,
      deleteTheme,
      sortAndRefresh,
      isNowRequest,
      clickTheme,
      showTheme,
      filterCallAuctionStockInfo,
      increaseRateSort,
      turnOverSort,
      dragonTiger,
      tradeAmountSort,
      simHisTimeStr,
      stockInfoArr,
      stockThemeMap,
      stockCodeMap,
      time,
    } = BaseUpLimitInfo(queryRef, styleInfo, props.hisNowFlag, queryParam)

    const volRateMedian = computed(() => {
      let allVol = 0;
      if (stockInfoArr.value.length == 0) {
        return 0;
      }
      stockInfoArr.value.forEach(item => {
        allVol += Number(item.lastVolRate);
      })
      return Number(allVol / stockInfoArr.value.length).toFixed(2);
    })

    const volRateStd = computed(() => {
      let allVol = 0;
      if (stockInfoArr.value.length == 0) {
        return 0;
      }
      stockInfoArr.value.forEach(item => {
        allVol += Number(item.lastVolRate);
      })
      let volMedian = Number(allVol / stockInfoArr.value.length);

      let allStdVol = Number(0);
      stockInfoArr.value.forEach(item => {
        allStdVol += (item.lastVolRate - volMedian) * (item.lastVolRate - volMedian);
      })
      return Number(allStdVol / stockInfoArr.value.length).toFixed(2);
    })

    async function setUpDownNum(key, objectSign) {
      await axios.post(AxiosUrl.stock.stockQuery.strategy, {
        dateStr: queryRef.value && queryRef.value.queryParam && queryRef.value.queryParam.dateStr ? queryRef.value.queryParam.dateStr : ConfigInfo.nowDate,
        timeStr: '09:25',
        riverStockTemplateSign: objectSign,
      }).then((res) => {
        increaseNumInfo[key] = res.totalNum;
      });
    }


    const volRateMedianFenshi = computed(() => {
      let allVol = 0;
      if (stockInfoArr.value.length == 0) {
        return 0;
      }
      stockInfoArr.value.forEach(item => {
        allVol += Number(item.auctionVol);
      })
      return Number(allVol / stockInfoArr.value.length).toFixed(2);
    })


    const volRateStdFenshi = computed(() => {
      let allVol = 0;
      if (stockInfoArr.value.length == 0) {
        return 0;
      }
      stockInfoArr.value.forEach(item => {
        allVol += Number(item.auctionVol);
      })
      let volMedian = Number(allVol / stockInfoArr.value.length);

      let allStdVol = Number(0);
      stockInfoArr.value.forEach(item => {
        allStdVol += (item.auctionVol - volMedian) * (item.auctionVol - volMedian);
      })
      return Number(allStdVol / stockInfoArr.value.length).toFixed(2);
    })

    const divStyle = ref({backgroundColor: '#8ee326'})

    const increaseWordStyle = ref({textAlign: 'center', fontSize: '12px'})
    const increaseNumStyle = ref({textAlign: 'center', fontSize: '20px'})
    const charStyleDayMedian = {width: '100%', height: '300px'};




    const beginDate = ref(ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate, 30))
    const endDate = ref(ConfigInfo.nowDate)

    const refreshDateJobId = ref()
    const refreshSpeedJobId = ref()
    const refreshValueJobId = ref()
    const increaseNumInfo = reactive({})

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

    function showDialog(val) {
      dialogFormVisible.value = true;
      codeUrl.value = val;
      time3.value = new Date().getTime()
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


    function getIntervalStatic() {

      if(queryRef.value.queryParam&&queryRef.value.queryParam.dateStr){
        beginDate.value = ConfigInfo.getBeforeEndDayStr(queryRef.value.queryParam.dateStr, 30);
        endDate.value = queryRef.value.queryParam.dateStr;
      }
      time12.value=new Date().getTime();
      setUpDownNum('UP_LEVEL_5', 'UP_LEVEL_5');
      setUpDownNum('UP_LEVEL_4', 'UP_LEVEL_4');
      setUpDownNum('UP_LEVEL_3', 'UP_LEVEL_3');
      setUpDownNum('UP_LEVEL_2', 'UP_LEVEL_2');
      setUpDownNum('UP_LEVEL_1', 'UP_LEVEL_1');
      setUpDownNum('LEVEL_0', 'LEVEL_0');
      setUpDownNum('DOWN_LEVEL_1', 'DOWN_LEVEL_1');
      setUpDownNum('DOWN_LEVEL_2', 'DOWN_LEVEL_2');
      setUpDownNum('DOWN_LEVEL_3', 'DOWN_LEVEL_3');
      setUpDownNum('DOWN_LEVEL_4', 'DOWN_LEVEL_4');
      setUpDownNum('DOWN_LEVEL_5', 'DOWN_LEVEL_5');

      if (!isNowRequest()) {
        simHisTimeStr.value = '09:25'
      }
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
      queryParam,
      getStockInfoArr,
      deleteStockInfo,
      stockCodeMap,
      getUpdateStockInfoArr,
      filterCallAuctionStockInfo,
      increaseRateSort,
      turnOverSort,
      dragonTiger,
      tradeAmountSort,
      dialogFormVisible,
      stockThemeMap,
      codeUrl,
      showDialog,
      showTheme,
      styleInfo,
      deleteTheme,
      isNowRequest,
      upLimitVolSubSort,
      upLimitVolSort,
      simHisTimeStr,
      time,
      timeStr,
      time3,
      showInfo,
      clickTheme, refreshDateJob, refreshSpeedJob, refreshValueJob,
      refreshDateJobId, refreshSpeedJobId, refreshValueJobId,
      getIntervalStatic, queryRef,
      volRateStd,
      volRateMedian,
      volRateStdFenshi,
      volRateMedianFenshi,
      divStyle,
      increaseWordStyle,
      increaseNumStyle,
      time12,
      beginDate,
      endDate,
      increaseNumInfo,
      charStyleDayMedian,
    }
  }
}
</script>

<style scoped>

</style>
