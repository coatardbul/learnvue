<template>
  <AnomalousBehaviorQueryFormLine
      ref="queryRef"
      @query="getAllAnomalousBehaviorData"
      @build-date="buildDate"
      @force-build-date="forceBuildDate"
  >
  </AnomalousBehaviorQueryFormLine>
  <AnomalousBehaviorTableForm
      ref="tableRef"
      :tableProp="tableProp"
      :tableData="tableData"
      :tableDescribe="tableDescribe"
      @batch-delete="batchDelete"
      @update-date="updateDate"
  >
  </AnomalousBehaviorTableForm>

</template>

<script setup>
import AnomalousBehaviorQueryFormLine from '@/view/stock/anomalousBehavior/AnomalousBehaviorQueryFormLine'
import AnomalousBehaviorTableForm from '@/view/stock/anomalousBehavior/AnomalousBehaviorTableForm'
import {onMounted, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import router from "@/config/router";
import ConfigInfo from "@/constant/ConfigInfo";

const tableData = ref([])
const tableProp = ref([])
const tableDescribe = ref({})
const queryRef = ref({})
const tableRef = ref({})

onMounted(() => {
  if (router.currentRoute.value.query.id) {
    queryRef.value.queryParam.id = router.currentRoute.value.query.id.split(',')
  }
  if (router.currentRoute.value.query.dateStr) {
    queryRef.value.queryParam.dateStr = router.currentRoute.value.query.dateStr
  }
})


function buildDate() {

  axios.post(AxiosUrl.stock.stockAnomalousBehavior.buildLastUpLimitInfo, {
    riverStockTemplateId: queryRef.value.queryParam.id.length == 0 ? null : queryRef.value.queryParam.id.join(),
    plateList: queryRef.value.queryParam.plateIdArr,

    dateStr: queryRef.value.queryParam.dateStr,
    beginDateStr: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[0],
    endDateStr: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[1],
    stockCode: queryRef.value.queryParam.stockCode,
  }).then();
}

function forceBuildDate() {
  axios.post(AxiosUrl.stock.stockAnomalousBehavior.forceBuildLastUpLimitInfo, {
    riverStockTemplateId: queryRef.value.queryParam.id.length == 0 ? null : queryRef.value.queryParam.id.join(),
    plateList: queryRef.value.queryParam.plateIdArr,

    dateStr: queryRef.value.queryParam.dateStr,
    beginDateStr: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[0],
    endDateStr: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[1],
    stockCode: queryRef.value.queryParam.stockCode,
  }).then((res) => {

  });
}

function batchDelete(){
  if( tableRef.value.mulitSelectArr){
    tableRef.value.mulitSelectArr.forEach(item=>{
      axios.post(AxiosUrl.stock.stockAnomalousBehavior.deleteAnomalousBehaviorData, {
        stockCode: item['code'],
      }).then();

    })

  }

}
function updateDate() {

  if( tableRef.value.mulitSelectArr){
    tableRef.value.mulitSelectArr.forEach(item=>{
      axios.post(AxiosUrl.stock.stockAnomalousBehavior.buildLastUpLimitInfo, {
        dateStr: queryRef.value.queryParam.dateStr,
        stockCode: item['code'],
      }).then();

    })

  }
}

function getAllAnomalousBehaviorData() {
  tableData.value.length = 0;
  tableProp.value.length = 0;
  tableDescribe.value = {}
  let codeIndex = {
    prop: 'code',
    label: 'code',
  }
  tableProp.value.push(codeIndex);
  let nameIndex = {
    prop: '股票简称',
    label: '股票简称',
  }
  tableProp.value.push(nameIndex);

  axios.post(AxiosUrl.river.calendar.getDate, {
    beginDate: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[0],
    endDate: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[1],
    dateProp: 1,
    addDay: -30,
  }).then((res) => {
    res.forEach(dateStr => {
      let dateStrIndex = {
        prop: dateStr,
        label: dateStr,
      }
      tableProp.value.push(dateStrIndex);
    })

  })


  axios.post(AxiosUrl.stock.stockAnomalousBehavior.getAllAnomalousBehaviorData, {
    riverStockTemplateId: queryRef.value.queryParam.id.length == 0 ? null : queryRef.value.queryParam.id.join(),
    dateStr: queryRef.value.queryParam.dateStr,
    plateList: queryRef.value.queryParam.plateIdArr,
    beginDateStr: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[0],
    endDateStr: queryRef.value.queryParam.dateRangeArray == null ? null : queryRef.value.queryParam.dateRangeArray[1],
    stockCode: queryRef.value.queryParam.stockCode,
  }).then((res) => {

    let codeMap = new Map();
    res.forEach(item => {
      if (codeMap.has(item.code)) {
        let newVar = codeMap.get(item.code);
        newVar.push(item);
        codeMap.set(item.code, newVar);
      } else {
        let codeDateArr = []
        codeDateArr.push(item);
        codeMap.set(item.code, codeDateArr);
      }
    })

    let allDescribeMap = new Map();
    for (let [key, value] of codeMap.entries()) {
      let tableColumnIndex = {
        code: key,
        股票简称: value[0].name,
      };
      let describeMap = new Map()
      value.forEach(dateInfo => {
        let newTempObject = {}
        newTempObject[dateInfo.date] = dateInfo.upLimitType;
        describeMap.set(dateInfo.date, dateInfo.upLimitInfo)
        tableColumnIndex = Object.assign(tableColumnIndex, newTempObject);
      })
      allDescribeMap.set(key, describeMap);
      tableDescribe.value = allDescribeMap;
      tableData.value.push(tableColumnIndex);
    }

  });
}


</script>

<style>

</style>
