<template>
  <el-affix :offset="90">

    <EmotionFormLine
        ref="queryRef"
        :show-info="showInfo"
        @query="getIntervalStatic"
    ></EmotionFormLine>
  </el-affix>
  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="24">
      <div>历史30日涨停数据</div>
      <UplimitDescriptTable :query-param="templateTableQueryParam"
                                     :key="time"
      >
      </UplimitDescriptTable>
    </el-col>

  </el-row>

  <el-row :gutter="32">
    <el-col :xs="24" :sm="24" :lg="24">
      <el-button type="success"   @click="jumpTo({erb:templateTableQueryParam.id,dateStr: endDate})" plain>昨曾模式</el-button>
      <el-button type="text"  @click="buildHisUpLimitDate">立即构建历史数据</el-button>
      <el-button type="text" @click="stockDetail({erb:templateTableQueryParam.id,dateStr: endDate})">详情</el-button>

      <OnceUplimitTemplateQueryTable :query-param="templateTableQueryParam"
                          :key="time"
      >
      </OnceUplimitTemplateQueryTable>
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

import UplimitDescriptTable from '@/view/stock/UpLimitDescribeTable'

import OnceUplimitTemplateQueryTable from '@/view/stock/UpLimitTemplateQueryTable'

import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'

import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import {useRouter} from 'vue-router';

const router = useRouter()
const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})
const queryRef = ref({})
const time = ref()
const beginDate = ref()
const endDate = ref(ConfigInfo.nowDate)

const queryParam = ref({
  dateStr: endDate.value,
  objectSign: "minute_emotion_statistic",
  timeInterval: 2
})

const templateTableQueryParam = ref({
  id: '1501584345410961408',
  dateStr: endDate.value,
})
const templateTableQueryParam1 = ref({
  id: '1477323946260037632',
  dateStr: endDate.value,
})

const charStypeUpDown = {width: '100%', height: '300px'};
const charStypeDayMedian = {width: '100%', height: '300px'};
function stockDetail(routerParam) {
  const {href} = router.resolve({name: "OpenWatch3", query: routerParam});
  window.open(href, '_blank');
}

function buildHisUpLimitDate(){
  if (queryRef.value == null) {
    return;
  }
  if (queryRef.value .queryParam== null) {
    return;
  }
  axios.post(AxiosUrl.stock.stockAnomalousBehavior.buildLastUpLimitInfo, {
    dateStr:  queryRef.value.queryParam.dateStr,
    riverStockTemplateId: '1501584345410961408',
  }).then();
}


function getIntervalStatic() {
  if (queryRef.value == null) {
    return;
  }
  if (queryRef.value .queryParam== null) {
    return;
  }
  endDate.value = queryRef.value.queryParam.dateStr;
  queryParam.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam1.value.dateStr = queryRef.value.queryParam.dateStr;
  axios.post(AxiosUrl.river.calendar.getSpecialDay, {
    dateStr: endDate.value,
    dateProp: 1,
    addDay: -15
  }).then((res) => {
    beginDate.value = res;
    time.value = new Date().getTime();
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
