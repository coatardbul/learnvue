<template>
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
      <div @click="jumpTo({erb:templateTableQueryParam6.id,dateStr: endDate})">首板高开</div>
      <TemplateQueryTable :query-param="templateTableQueryParam6"
                          :key="time">
      </TemplateQueryTable>

    </el-col>
    <el-col :xs="24" :sm="24" :lg="14">
      <div>  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       </div>
      <div @click="jumpTo({erb:templateTableQueryParam1.id,dateStr: endDate})">破剑式</div>
      <TemplateQueryTable :query-param="templateTableQueryParam1"
                          :key="time"
      >
      </TemplateQueryTable>
      <div @click="jumpTo({erb:templateTableQueryParam2.id,dateStr: endDate})">二板高于预期</div>
      <TemplateQueryTable :query-param="templateTableQueryParam2"
                          :key="time"
      >
      </TemplateQueryTable>
      <div @click="jumpTo({erb:templateTableQueryParam3.id,dateStr: endDate})">二板高于预期快速冲板,未上板注意洗盘动作</div>
      <TemplateQueryTable :query-param="templateTableQueryParam3"
                          :key="time"
      >
      </TemplateQueryTable>


    </el-col>
  </el-row>
      <el-row :gutter="32">
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
        <div># 破剑式超过1亿需要小心。</div>
        <div># 用兵不复。</div>
        <div> # 客观,不能带有任何主观思想。</div>
        <div> # 首次涨停（查看二板栏板），盘中买，不能开盘买</div>
        <div> # 危机中孕育着希望，一致中孕育着危机。</div>
        <div> # 有的时候，出手的机会只有一次。</div>
        <div> # 高位有量的票，往往都有一次自保的机会。</div>
        <div> # 用价来平衡量</div>
        <div> # 买新不买就</div>
        <div> # 不买抛压重的票</div>


      </div>
    </el-col>
  </el-row>

  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="14">

      <div @click="jumpTo({erb:templateTableQueryParam.id,dateStr: endDate})">两板以上集合竞价</div>
      <TemplateQueryTable :query-param="templateTableQueryParam"
                          :key="time">
      </TemplateQueryTable>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="10">
      <div @click="jumpTo({erb:templateTableQueryParam5.id,dateStr: endDate})">首次涨停（查看二板栏板）</div>
      <TemplateQueryTable :query-param="templateTableQueryParam5"
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
import PanelGroup from '@/components/PanelGroup'
import BaseMintureStatistic from "@/view/stock/BaseMintureStatistic";
import BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import BaseDayUpDownStatistic from '@/view/stock/BaseDayUpDownStatistic'
import TemplateQueryTable from '@/view/stock/templatedQuery/TemplateQueryTable'
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'

import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import { useRouter } from 'vue-router';

const router=useRouter()
const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})
const queryRef = ref()
const time = ref()
const beginDate = ref()
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
  id: '1502896274603638784',
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
  id: '1506450265249808384',
  dateStr: endDate.value,
})
const templateTableQueryParam6 = ref({
  id: '1505911842550185984',
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
      queryParam.value.dateStr =res;
      time.value = new Date().getTime();
    });
  });
}
function jumpTo(routerParam) {
  const {href} = router.resolve({name: "index4", query: routerParam});
  window.open(href, '_blank');
}
onMounted(() => {
  getIntervalStatic();
})


</script>

<style scoped>
.bg-purple {
  background: #b3e8ea;
}

.ss {
  display: inline
}

.grid-content {
  border-radius: 10px;
  min-height: 200px;
}

</style>
