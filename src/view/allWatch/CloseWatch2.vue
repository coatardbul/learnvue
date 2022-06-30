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
      <span>稳中有升-大阳-阴-阳</span>
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
    <el-col :span="12">
      <span>稳中有升-大大阳-小阳-大阳</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr6 "
              @close="deleteStockInfo(stockInfoArr6,item)"
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
      <span>稳中有升--涨停-阳-阳</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr7 "
              @close="deleteStockInfo(stockInfoArr7,item)"
              :key="item"
              :style-info="styleInfo"
              :stock-info="item"
              @dialog-form-visible="showDialog"
          ></StockBaseInfo>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="12">
      <span>稳中有升--大阳-小阳-大阳</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr8 "
              @close="deleteStockInfo(stockInfoArr8,item)"
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
      <span>稳中有胜-涨幅大于0-大阴-大阳</span>
      <el-scrollbar height="400px">
        <div :key="time">
          <StockBaseInfo
              v-for="item in stockInfoArr9 "
              @close="deleteStockInfo(stockInfoArr9,item)"
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
              v-for="item in stockInfoArr10 "
              @close="deleteStockInfo(stockInfoArr10,item)"
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
import StockBaseInfo from '@/view/allWatch/StockBaseDivInfo';
import ExternalPage from '@/view/allWatch/ExternalPage'
import RebuildBaseUpLimitInfo from "@/view/allWatch/RebuildBaseUpLimitInfo";

const queryRef = ref()
const time3 = ref()
const codeUrl = ref()

const stockInfoArr5 = ref([])
const stockInfoArr6 = ref([])
const stockInfoArr7 = ref([])
const stockInfoArr8 = ref([])
const stockInfoArr9 = ref([])
const stockInfoArr10 = ref([])

const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})

//稳中有升（大阳-阴-阳）
const queryParam5 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE_UP_DOWN_UP',
  timeInterval: 2,
  hisNowFlag: 'now',
})

//稳中有升（大阳-小阳-大点阳）
const queryParam6 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE_UP_BIG_SMALL_BIG',
  timeInterval: 2,
  hisNowFlag: 'now',
})

//稳中有升（涨停--小阳--小阳）
const queryParam7 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE_UPLIMIT_UP_UP',
  timeInterval: 2,
  hisNowFlag: 'now',
})
//稳中有升--大小大
const queryParam8 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE_BIG_SMALL_BIG',
  timeInterval: 2,
  hisNowFlag: 'now',
})
//稳中有升--小阳-大阴-大阳
const queryParam9 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'STEADY_THREE_INCREASE_UP_SMALL_DOWN_BIG_UP_BIG',
  timeInterval: 2,
  hisNowFlag: 'now',
})

//昨曾，外侧
const queryParam10 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'HAVE_UP_LIMIT,OUTSIDE_AMPLITUDE_LOW_AMOUNT',
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
    queryParam5.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam6.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam7.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam8.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam9.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam10.value.dateStr = queryRef.value.queryParam.dateStr;

  }
  stockInfoArr5.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam5.value).getStockInfoArr(stockInfoArr5.value);
  stockInfoArr6.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam6.value).getStockInfoArr(stockInfoArr6.value);
  stockInfoArr7.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam7.value).getStockInfoArr(stockInfoArr7.value);
  stockInfoArr8.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam8.value).getStockInfoArr(stockInfoArr8.value);
  stockInfoArr9.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam9.value).getStockInfoArr(stockInfoArr9.value);
  stockInfoArr10.value.length = 0;
  RebuildBaseUpLimitInfo(queryParam10.value).getStockInfoArr(stockInfoArr10.value);
  time.value = new Date().getTime();
}


function deleteStockInfo(stockInfoArr, item) {
  RebuildBaseUpLimitInfo(queryParam5.value).deleteStockInfo(stockInfoArr, item);
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
