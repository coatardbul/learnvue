<template>
  <EmotionDayFormLine ref="dayRangeToolbar" @query-day-emotion="getDayStatic"></EmotionDayFormLine>
  <div class="1111111">
    <BaseDayMedianStatistic  :char-style="charStypeMedian"
                             :key="time"
                             :begin-date="beginDate"
                             :end-date="endDate"
    ></BaseDayMedianStatistic>
    <BaseDayUpDownStatistic  :char-style="charStypeUpDown"
                             :key="time"
                             :begin-date="beginDate"
                             :end-date="endDate"
    ></BaseDayUpDownStatistic>
  </div>

</template>

<script setup>
import EmotionDayFormLine from './EmotionDayFormLine'
import BaseDayMedianStatistic from './BaseDayMedianStatistic'
import BaseDayUpDownStatistic from './BaseDayUpDownStatistic'

import {ref} from "vue";
const time =ref()
const beginDate=ref()
const endDate=ref()
const baseDayStatistic=ref()
const dayRangeToolbar=ref(null)
const charStypeMedian={width: '100%', height: '500px'};

const charStypeUpDown={width: '100%', height: '5000px'};

function getDayStatic(){

  if(dayRangeToolbar.value.queryParam.dateRangeArray){
    beginDate.value=dayRangeToolbar.value.queryParam.dateRangeArray[0]
    endDate.value=dayRangeToolbar.value.queryParam.dateRangeArray[1]
  }else {
    beginDate.value='2022-01-01'
    endDate.value='2022-12-01'
  }
  time.value=new Date().getTime()

}


</script>

<style scoped>

</style>
