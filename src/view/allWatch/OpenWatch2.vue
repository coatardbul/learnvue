<template>
  <el-affix :offset="30">

    <EmotionFormLine
        ref="queryRef"
        :show-info="showInfo"
        @query="getIntervalStatic"
    ></EmotionFormLine>
  </el-affix>

  <el-row :gutter="5">
    <el-col :span="10">
      <div style="background-color: rgb(236,245,255)">
        晋级率
        <BaseDayUpLimitPromotionStatistic :char-style="charStyleMedian"
                                          :key="time"
                                          :begin-date="beginDate"
                                          :end-date="queryParam.dateStr">
        </BaseDayUpLimitPromotionStatistic>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="background-color: rgb(236,245,255)">

        <el-scrollbar max-height="400px">
          <BaseDayUpDownStatistic :char-style="charStyleUpDown"
                                  :key="time"
                                  :begin-date="beginDate"
                                  :end-date="queryParam.dateStr"
          ></BaseDayUpDownStatistic>
        </el-scrollbar>
      </div>
    </el-col>
    <el-col :span="4">
      <div style="background-color: rgb(236,245,255)">
        喇叭口
        <BaseDayStandardDeviationStatistic :char-style="charStypeDayMedian"
                                           :key="time"
                                           :begin-date="beginDate"
                                           :end-date="endDate"
        ></BaseDayStandardDeviationStatistic>
      </div>
    </el-col>
    <el-col :span="4">
      <div style="background-color: rgb(236,245,255)">
        昨日情绪
        <BaseMintureStatistic
            :query-param="queryParam"
            :char-style="charStypeUpDown"
            :key="time"
        ></BaseMintureStatistic>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="24">
      <UpLimitStatic :date-str="endDate"
                     :key="time">
      </UpLimitStatic>
      <el-button @click="jumpTo({erb:templateTableQueryParam.id,dateStr: endDate})">两板以上集合竞价</el-button>
      <el-button type="text" @click="stockDetail({erb:templateTableQueryParam.id,dateStr: endDate,templateSign:templateTableQueryParam.templateSign})">详情</el-button>
      <el-button type="text" @click="historyStockDetail({erb:templateTableQueryParam.id,dateStr: endDate,templateSign:templateTableQueryParam.templateSign})">历史详情
      </el-button>

      <TemplateQueryTable :query-param="templateTableQueryParam"
                          :key="time">
      </TemplateQueryTable>
    </el-col>

  </el-row>


  <div>
    <div class="ss" style="width:600px ">

    </div>
    <div class="ss" style="width:600px ">

    </div>
  </div>

</template>

<script setup>
import BaseMintureStatistic from "@/view/stock/MintureEmotionStatistic";
import BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import BaseDayUpDownStatistic from '@/view/stock/BaseDayUpDownStatistic'
import TemplateQueryTable from '@/view/stock/UpLimitTemplateQueryTable'
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import {useRouter} from 'vue-router';
import BaseDayUpLimitPromotionStatistic from '@/view/stock/BaseDayUpLimitPromotionStatistic'
import UpLimitStatic from '@/view/stock/UpLimitStatic'

const router = useRouter()
const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})
const queryRef = ref()
const time = ref()
const beginDate = ref(ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate,15))
const endDate = ref(ConfigInfo.nowDate)
const yesterday = ref()
const queryParam = ref({
  dateStr: yesterday.value,
  objectSign: "minute_emotion_statistic",
  timeInterval: 2
})

const templateTableQueryParam = ref({
  id: '1481302460344696832',
  templateSign:'TWO_UP_LIMIT_ABOVE_CALL_AUCTION',
  dateStr: endDate.value,
})


const charStypeUpDown = {width: '100%', height: '300px'};
const charStypeDayMedian = {width: '100%', height: '300px'};

function getIntervalStatic() {
  if (queryRef.value == null) {
    return;
  }
  endDate.value = queryRef.value.queryParam.dateStr;
  templateTableQueryParam.value.dateStr = queryRef.value.queryParam.dateStr;
  axios.post(AxiosUrl.river.calendar.getSpecialDay, {
    dateStr: endDate.value,
    dateProp: 1,
    addDay: -15
  }).then((res) => {
    beginDate.value = res;
    axios.post(AxiosUrl.river.calendar.getSpecialDay, {
      dateStr: endDate.value,
      dateProp: 1,
      addDay: -1
    }).then((res) => {
      queryParam.value.dateStr = res;
      yesterday.value = res;
      time.value = new Date().getTime();
    });
  });
}

function stockDetail(routerParam) {
  const {href} = router.resolve({name: "OpenWatch3", query: routerParam});
  window.open(href, '_blank');
}

function jumpTo(routerParam) {
  const {href} = router.resolve({name: "index4", query: routerParam});
  window.open(href, '_blank');
}

function historyStockDetail(routerParam) {
  const {href} = router.resolve({name: "HistoryAuctionSimulate", query: routerParam});
  window.open(href, '_blank');
}

onMounted(() => {
})


</script>

<style scoped>
.bg-purple {
  background: #e3b726;
}

.ss {
  display: inline
}

.grid-content {
  border-radius: 10px;
  min-height: 200px;
}

</style>
