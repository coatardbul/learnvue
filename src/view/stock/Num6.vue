<template>
  <EmotionDayFormLine ref="dayRangeToolbar" @query="getDayStatic"></EmotionDayFormLine>
  <div  style="width: 100%;">
    <BaseDayStandardDeviationStatistic  :char-style="charStyleMedian"
                                        :key="time"
                                        :begin-date="beginDate"
                                        :end-date="endDate">
    </BaseDayStandardDeviationStatistic>
    <BaseDayUpLimitPromotionStatistic  :char-style="charStyleMedian"
                                       :key="time"
                                       :begin-date="beginDate"
                                       :end-date="endDate">
    </BaseDayUpLimitPromotionStatistic>
    <BaseDayUpDownStatistic  :char-style="charStyleUpDown"
                             :key="time"
                             :begin-date="beginDate"
                             :end-date="endDate"
    ></BaseDayUpDownStatistic>
  </div>
</template>

<script setup>
import EmotionDayFormLine from './EmotionDayFormLine'
import BaseDayUpDownStatistic from './BaseDayUpDownStatistic'
import  BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import  BaseDayUpLimitPromotionStatistic from '@/view/stock/BaseDayUpLimitPromotionStatistic'

import {ref} from "vue";
const time =ref()
const beginDate=ref()
const endDate=ref()
const dayRangeToolbar=ref(null)
const charStyleMedian={width: '100%', height: '250px'};

const charStyleUpDown={width: '100%', height: '1000px'};

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
