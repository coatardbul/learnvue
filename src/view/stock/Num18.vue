<template>
  <EmotionFormLine
      ref="queryRef"
      :show-info="showInfo"
      @refresh="refreshDate"
      @query="getDayDetail"
      @supplement-refresh="deleteDate"
  ></EmotionFormLine>

  <el-calendar ref="calendar"    v-model="value">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span ref="dateInfo">{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-year')"
        >上一年</el-button
        >
        <el-button size="small" @click="selectDate('prev-month')"
        >上一月</el-button
        >
        <el-button size="small" @click="selectDate('today')">当日</el-button>
        <el-button size="small" @click="selectDate('next-month')"
        >下一月</el-button
        >
        <el-button size="small" @click="selectDate('next-year')"
        >下一年</el-button
        >
      </el-button-group>
    </template>
    <template #dateCell="{ data }">
      <el-popover
          placement="top-start"
          :width="200"
          trigger="hover"
          :content="getContent(data.day.split('-').slice(1).join('-'))"
      >
        <template #reference>
          <div  :key="time"
              :class=" getContent(data.day.split('-').slice(1).join('-')) !=null ? 'is-selected' : ''">
            {{data.day.split('-').slice(1).join('-')}}
          </div>
        </template>
      </el-popover>
    </template>
  </el-calendar>
</template>

<script setup>
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import moment from "moment";
import EmotionFormLine from './EmotionMinuteFormLine'


const queryRef=ref({})



const content=ref()
const value = ref(new Date())
const  time =ref()
const tableData=reactive([])
const dateInfo=ref()
const calendar = ref()
const showInfo=ref({
  tradeButton: true,
  objectSign:true,
  forceRefreshButton: true,
  forceRefreshName: '强制刷新',
  supplementRefreshButton:true,
  supplementRefreshName:'删除数据',
})
function selectDate (val)  {
  calendar.value.selectDate(val)
  tableData.length=0
  getDayDetail();

}



function refreshDate(queryParam) {
  axios.post(AxiosUrl.stock.stockDayStatic.refreshDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign:queryRef.value.queryParam.objectSign
  }).then();
}
function deleteDate(queryParam) {
  axios.post(AxiosUrl.stock.stockDayStatic.deleteDay, {
    dateStr: queryParam == null || queryParam.dateStr == null ? ConfigInfo.nowDate : queryParam.dateStr,
    objectEnumSign:queryRef.value.queryParam.objectSign
  }).then();
}



function  getContent(data){
  let obj=   tableData.find(function (item){
    return item.date.indexOf(data) >=0;
  });
  content.value=obj;
  return  obj;
}




 function getDayDetail(queryTemp) {
  tableData.length = 0;
  axios.post(AxiosUrl.stock.stockDayStatic.getRangeStatic, {
    dateBeginStr: moment(value.value).format('YYYY-MM') + '-01',
    dateEndStr: moment(value.value).format('YYYY-MM') + '-31',
    objectEnumSign: queryTemp != null ? queryTemp.objectSign : queryRef.value.queryParam.objectSign
    ,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}
onMounted(()=>{
  getDayDetail();
})

</script>

<style scoped>
.is-selected {
  color: #852121;
  background-color: #26e372;
height: 60px;
}
</style>
