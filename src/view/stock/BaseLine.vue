<template>
  <BaseDayStandardDeviationStatistic  :char-style="charStypeMedian"
                                      :key="time"
                                      :begin-date="beginDate"
                                      :end-date="endDate">
  </BaseDayStandardDeviationStatistic>
  <BaseDayUpLimitPromotionStatistic  :char-style="charStypeMedian"
                                      :key="time"
                                      :begin-date="beginDate"
                                      :end-date="endDate">
  </BaseDayUpLimitPromotionStatistic>
</template>
<script setup>
import  BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import  BaseDayUpLimitPromotionStatistic from '@/view/stock/BaseDayUpLimitPromotionStatistic'

import {ref} from "vue";
const time =ref()
const beginDate=ref()
const endDate=ref()
const charStypeMedian={width: '100%', height: '300px'};

</script>
