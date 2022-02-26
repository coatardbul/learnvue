<template>
  <EmotionFormLine  ref="queryRef"
                    :show-info="showInfo"
                   @refresh="refreashDayInfo"
  ></EmotionFormLine>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'
import moment from "moment";
import axios from "axios";
import router from "@/config/router";
import EmotionFormLine from './EmotionMinuteFormLine'

const showInfo = reactive({
  tradeButton: true,
  baseButton: false,
  forceRefreshButton: true,
  forceRefreshName: '刷新当日数据',

})

const  queryRef=ref()

onMounted(() => {
  if (router.currentRoute.value.query.erb) {
    queryRef.value.queryParam.dateStr= router.currentRoute.value.query.erb
  }
})

function refreashDayInfo(queryParam) {
  axios.post("stock/stockQuery/saveDate", {
    excelTemplateId: "1483051288928321536",
    dateBeginStr: queryParam.dateStr,
    dateEndStr: queryParam.dateStr
  }).then()
}
</script>
