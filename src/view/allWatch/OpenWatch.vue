<template>
  <div>################################################################</div>
  <div>################################################################</div>
  <div>################################################################</div>
  <div>################################################################</div>
  <div>################################################################</div>
  <div>################################################################</div>
  <el-affix :offset="30">

    <EmotionFormLine
        ref="queryRef"
        :show-info="showInfo"
        @query="getIntervalStatic"
    ></EmotionFormLine>
  </el-affix>
  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="10">
      <div>################################################################</div>
      <el-scrollbar height="500px">
        <BaseDayUpDownStatistic :char-style="charStyleUpDown"
                                :key="time"
                                :begin-date="beginDate"
                                :end-date="queryParam.dateStr"
        ></BaseDayUpDownStatistic>
      </el-scrollbar>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="14">
      <el-scrollbar height="500px">
        <FirstUpLimitStatic :date-str="endDate"
                            :key="time">
        </FirstUpLimitStatic>
      </el-scrollbar>

    </el-col>
  </el-row>


  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="12">
      <div>昨日连板</div>
      <UpLimitStatic :date-str="endDate"
                     :key="time">
      </UpLimitStatic>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12">
      <div>今日连板</div>
      <UpLimitDayStatic :date-str="endDate"
                        :key="time">
      </UpLimitDayStatic>

    </el-col>
  </el-row>


  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
        <BaseDayUpLimitPromotionStatistic :char-style="charStypeDayMedian"
                                          :key="time"
                                          :begin-date="beginDate"
                                          :end-date="queryParam.dateStr">
        </BaseDayUpLimitPromotionStatistic>
      </div>

    </el-col>

    <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
        喇叭口
        <BaseDayStandardDeviationStatistic :char-style="charStypeDayMedian"
                                           :key="time"
                                           :begin-date="beginDate"
                                           :end-date="endDate"
        ></BaseDayStandardDeviationStatistic>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
        昨日情绪
        <BaseMintureStatistic
            :query-param="queryParam"
            :char-style="charStypeUpDown"
            :key="time"
        ></BaseMintureStatistic>
      </div>
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
import FirstUpLimitStatic from '@/view/stock/FirstUpLimitStatic'
import UpLimitDayStatic from '@/view/stock/UpLimitDayStatic'

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
const beginDate = ref(ConfigInfo.getBeforeEndDayStr(ConfigInfo.nowDate,30))
const endDate = ref(ConfigInfo.nowDate)
const yesterday = ref()
const queryParam = ref({
  dateStr: yesterday.value,
  objectSign: "minute_emotion_statistic",
  timeInterval: 2
})

const templateTableQueryParam = ref({
  id: '1481302460344696832',
  dateStr: endDate.value,
})
const templateTableQueryParam1 = ref({
  id: '1505216687434235904',
  dateStr: endDate.value,
})
const templateTableQueryParam2 = ref({
  id: '1505216687434235904',
  dateStr: endDate.value,
})
const templateTableQueryParam3 = ref({
  id: '1505357737901555712',
  dateStr: endDate.value,
})
const templateTableQueryParam4 = ref({
  id: '1505911842550185984',
  dateStr: endDate.value,
})
const templateTableQueryParam5 = ref({
  id: '1508081049291325440',
  dateStr: endDate.value,
})
const templateTableQueryParam6 = ref({
  id: '1481302460344696832',
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
  templateTableQueryParam1.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam2.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam3.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam4.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam5.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam6.value.dateStr = queryRef.value.queryParam.dateStr;
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

function jumpTo(routerParam) {
  const {href} = router.resolve({name: "index4", query: routerParam});
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
