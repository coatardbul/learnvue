<template>
  <EmotionDayFormLine ref="dayRangeToolbar" @query="getDayStatic"></EmotionDayFormLine>
  <div  style="width: 90%;">
  <el-affix >
  <BaseDayMedianStatistic  :char-style="charStypeMedian"
                             :key="time"
                             :begin-date="beginDate"
                             :end-date="endDate"
    ></BaseDayMedianStatistic>
  </el-affix>
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
const charStypeMedian={width: '100%', height: '300px'};

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
