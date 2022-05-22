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
      <span>昨日涨跌统计</span>
      <MintureUpDownNumStatistic
          :query-param="queryParam"
          :char-style="charStyleDayMedian"
          :key="time"
      ></MintureUpDownNumStatistic>
    </el-col>
    <el-col :span="12">
      <span>昨日情绪</span>
      <MintureEmotionStatistic
          :query-param="queryParam1"
          :char-style="charStyleDayMedian"
          :key="time">
      </MintureEmotionStatistic>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <span>首板烂板--开板次数大</span>
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
      <span>首板烂板--封板时长短</span>
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
      <span>二板强，三板弱</span>
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
  </el-row>

  <el-dialog v-model="dialogFormVisible" title="分时图" append-to-body>
    <ExternalPage :key="time3" :code-str="codeUrl"></ExternalPage>
  </el-dialog>


</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import ConfigInfo from "@/constant/ConfigInfo";
import BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import BaseDayUpLimitPromotionStatistic from '@/view/stock/BaseDayUpLimitPromotionStatistic'
import MintureEmotionStatistic from "@/view/stock/MintureEmotionStatistic";
import MintureUpDownNumStatistic from '@/view/stock/MintureUpDownNumStatistic'
import StockBaseInfo from '@/view/allWatch/StockBaseDivInfo';
import RebuildBaseUpLimitInfo from "@/view/allWatch/RebuildBaseUpLimitInfo";
import ExternalPage from '@/view/allWatch/ExternalPage'


const queryRef = ref()
const dialogFormVisible = ref(false)
const time3 = ref()
const codeUrl = ref()
const styleInfo = ref({})


const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})

const queryParam = ref({
  dateStr: ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate, 1),
  objectSign: 'minute_up_down_num_statistic',
  timeInterval: 2,
})
const queryParam1 = ref({
  dateStr: ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate, 1),
  objectSign: 'minute_emotion_statistic',
  timeInterval: 2,
})


//首板烂板--开板次数大
const queryParam5 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'FIRST_UP_LIMIT_OPEN_NUM_BIG',
  timeInterval: 2,
  hisNowFlag: 'now',
})

//首板烂板--开板次数大
const queryParam6 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'FIRST_UP_LIMIT_TIME_SMALL',
  timeInterval: 2,
  hisNowFlag: 'now',
})
const queryParam7 = ref({
  dateStr: ConfigInfo.nowDate,
  objectSign: 'FIRST_UP_LIMIT_STRONG_THREE_WEAK',
  timeInterval: 2,
  hisNowFlag: 'now',
})


const increaseNumInfo = reactive({})

const divStyle = ref({backgroundColor: '#8ee326'})

const increaseWordStyle = ref({textAlign: 'center', fontSize: '12px'})
const increaseNumStyle = ref({textAlign: 'center', fontSize: '20px'})


const charStyleDayMedian = {width: '100%', height: '300px'};
const beginDate = ref(ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate, 30))
const endDate = ref(ConfigInfo.nowDate)
const time = ref()
const stockInfoArr5 = ref([])
const stockInfoArr6 = ref([])
const stockInfoArr7 = ref([])


async function setUpDownNum(key, objectSign) {
  await axios.post(AxiosUrl.stock.stockQuery.strategy, {
    dateStr: queryRef.value && queryRef.value.queryParam && queryRef.value.queryParam.dateStr ? queryRef.value.queryParam.dateStr : ConfigInfo.nowDate,
    timeStr: '09:25',
    riverStockTemplateSign: objectSign,
  }).then((res) => {
    increaseNumInfo[key] = res.totalNum;
  });
}

function showDialog(val) {
  dialogFormVisible.value = true;
  codeUrl.value = val;
  time3.value = new Date().getTime()
}


function deleteStockInfo(stockInfoArr, item) {
  RebuildBaseUpLimitInfo(queryParam.value).deleteStockInfo(stockInfoArr, item);
}


function getIntervalStatic() {
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

  if (queryRef.value && queryRef.value.queryParam && queryRef.value.queryParam.dateStr) {
    endDate.value = queryRef.value.queryParam.dateStr;
    queryParam5.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam6.value.dateStr = queryRef.value.queryParam.dateStr;
    queryParam7.value.dateStr = queryRef.value.queryParam.dateStr;

    axios.post(AxiosUrl.river.calendar.getSpecialDay, {
      dateStr: queryRef.value.queryParam.dateStr,
      dateProp: 1,
      addDay: -1
    }).then((res) => {
      queryParam.value.dateStr = res;
      queryParam1.value.dateStr = res;
    });

    stockInfoArr5.value.length = 0;
    RebuildBaseUpLimitInfo(queryParam5.value).getStockInfoArr(stockInfoArr5.value);
    stockInfoArr6.value.length = 0;
    RebuildBaseUpLimitInfo(queryParam6.value).getStockInfoArr(stockInfoArr6.value);
    stockInfoArr7.value.length = 0;
    RebuildBaseUpLimitInfo(queryParam7.value).getStockInfoArr(stockInfoArr7.value);

  }


  time.value = new Date().getTime();
}


onMounted(() => {
})


</script>

<style scoped>


</style>
