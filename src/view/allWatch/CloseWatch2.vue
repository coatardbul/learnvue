<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @query="getIntervalStatic"
  ></EmotionFormLine>
  <el-row :gutter="20">
    <el-col :span="12">
      <div>
        喇叭口
        <BaseDayStandardDeviationStatistic :char-style="charStyleDayMedian"
                                           :key="time"
                                           :begin-date="beginDate"
                                           :end-date="endDate"
        ></BaseDayStandardDeviationStatistic>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="background-color: rgb(236,245,255)">
        晋级率
        <BaseDayUpLimitPromotionStatistic :char-style="charStyleDayMedian"
                                          :key="time"
                                          :begin-date="beginDate"
                                          :end-date="endDate">
        </BaseDayUpLimitPromotionStatistic>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <span>当日涨跌统计</span>
      <MintureUpDownNumStatistic
          :query-param="queryParam2"
          :char-style="charStyleDayMedian"
          :key="time"
      ></MintureUpDownNumStatistic>
    </el-col>
    <el-col :span="12">
      <span>当日情绪</span>
      <MintureEmotionStatistic
          :query-param="queryParam1"
          :char-style="charStyleDayMedian"
          :key="time">
      </MintureEmotionStatistic>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <span>稳中有升</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr "
              @close="deleteStockInfo(stockInfoArr,item)"
              :key="item"
              :style-info="styleInfo"
              :stock-info="item"
              @dialog-form-visible="showDialog"
          ></StockBaseInfo>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="12">
      <span>昨曾+外侧</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr1 "
              @close="deleteStockInfo(stockInfoArr1,item)"
              :key="item"
              :style-info="styleInfo"
              :stock-info="item"
              @dialog-form-visible="showDialog"
          ></StockBaseInfo>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <span>稳中有升--大小大</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr5 "
              @close="deleteStockInfo(stockInfoArr5,item)"
              :key="item"
              :style-info="styleInfo"
              :stock-info="item"
              @dialog-form-visible="showDialog"
          ></StockBaseInfo>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>

  <el-dialog v-model="dialogFormVisible" title="分时图" append-to-body>
    <ExternalPage :key="time3" :code-str="codeUrl"></ExternalPage>
  </el-dialog>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";

import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import ConfigInfo from "@/constant/ConfigInfo";
import BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import BaseDayUpLimitPromotionStatistic from '@/view/stock/BaseDayUpLimitPromotionStatistic'
import MintureEmotionStatistic from "@/view/stock/MintureEmotionStatistic";
import MintureUpDownNumStatistic from '@/view/stock/MintureUpDownNumStatistic'
import BaseUpLimitInfo from "@/view/allWatch/BaseUpLimitInfo";
import StockBaseInfo from '@/view/allWatch/StockBaseDivInfo';
import ExternalPage from '@/view/allWatch/ExternalPage'
import RebuildBaseUpLimitInfo from "@/view/allWatch/RebuildBaseUpLimitInfo";

const queryRef = ref()
const time3 = ref()
const codeUrl = ref()

const stockInfoArr = ref([])
const stockInfoArr1 = ref([])
const stockInfoArr5 = ref([])

const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})

//节节高
const queryParam = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE',
  timeInterval: 2,
  hisNowFlag: 'now',
})

//昨曾，外侧
const queryParam3 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'HAVE_UP_LIMIT,OUTSIDE_AMPLITUDE_LOW_AMOUNT',
  timeInterval: 2,
  hisNowFlag: 'now',
})

//节节高编译
const queryParam5 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE_BIG_SMALL_BIG',
  timeInterval: 2,
  hisNowFlag: 'now',
})

const queryParam2 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'minute_up_down_num_statistic',
  timeInterval: 2,
})
const queryParam1 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'minute_emotion_statistic',
  timeInterval: 2,
})

const styleInfo = ref({})
const time = ref()

const dialogFormVisible = ref(false)


const charStyleDayMedian = {width: '100%', height: '300px'};
const beginDate = ref(ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate, 30))
const endDate = ref(ConfigInfo.nowDate)


function getIntervalStatic() {
  if (queryRef.value && queryRef.value.queryParam && queryRef.value.queryParam.dateStr) {
    endDate.value = queryRef.value.queryParam.dateStr;
    queryParam2.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam1.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam3.value.dateStr = queryRef.value.queryParam.dateStr;

    queryParam5.value.dateStr = queryRef.value.queryParam.dateStr;

  }
  stockInfoArr.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam.value).getStockInfoArr(stockInfoArr.value);
  stockInfoArr1.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam3.value).getStockInfoArr(stockInfoArr1.value);

  stockInfoArr5.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam5.value).getStockInfoArr(stockInfoArr5.value);

  time.value = new Date().getTime();
}


function deleteStockInfo(stockInfoArr, item) {
  RebuildBaseUpLimitInfo(queryParam.value).deleteStockInfo(stockInfoArr, item);
}

function showDialog(val) {
  dialogFormVisible.value = true;
  codeUrl.value = val;
  time3.value = new Date().getTime()
}


onMounted(() => {
})


</script>

<style scoped>


</style>
