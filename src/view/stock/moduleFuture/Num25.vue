<template>
  <ModulePredictFormLine
      ref="queryRef"
      @query="query"
      @excute="excute"
      @delete-info="deleteQuery"
  >
  </ModulePredictFormLine>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="模板id"
                     width="190">
      <template #default="scope">
        <span>{{ scope.row.templatedId }}</span>
      </template>
    </el-table-column>
    <el-table-column label="模板名称"
                     width="150">
      <template #default="scope">
        <span>{{ scope.row.templatedName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="买入日期" width="130">
      <template #default="scope">
        <span>{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="买入时间" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.buyTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="买入涨幅" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span  :style="getColor(scope.row.buyIncreaseRate)">{{
            Number( scope.row.buyIncreaseRate).toFixed(2) + '%'
            }}</span>
      </template>
    </el-table-column>
    <el-table-column label="收盘涨幅" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span  :style="getColor(scope.row.closeIncreaseRate)">{{
            Number( scope.row.closeIncreaseRate).toFixed(2) + '%'
          }}</span>
      </template>
    </el-table-column>
    <el-table-column label="持有天数" width="50" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.holdDay }}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖出时间" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.saleTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="股票代码" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column label="股票名称" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="市值" width="150" sortable
                     :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ forMatterMoneyNum(scope.row.marketValue) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="换手率" width="150" sortable
                     :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ forMatterRate(scope.row.turnoverRate) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="买入价格" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.buyPrice }}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖出价格" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.salePrice }}</span>
      </template>
    </el-table-column>
    <el-table-column label="增长百分比" width="100" sortable :show-overflow-tooltip="true">
      <template #default="scope">
        <span :style="getIncreaseRate(scope.row)">{{
            Number((scope.row.salePrice - scope.row.buyPrice) / scope.row.buyPrice * 100).toFixed(2) + '%'
          }}</span>
      </template>
    </el-table-column>
    <el-table-column label="详情" width="300" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ JSON.stringify(JSON.parse(scope.row.detail), null, 2) }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup>
import ModulePredictFormLine from './ModulePredictFormLine'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import {onMounted, ref} from "vue";

const queryRef = ref({})
const tableData = ref([])


function query() {
  tableData.value = [];

  axios.post(AxiosUrl.stock.stockPredict.getAll, {
    id: queryRef.value.queryParam.id.join(),
    buyTime: queryRef.value.queryParam.buyTime,
    beginDate: queryRef.value.queryParam.dateRangeArray[0],
    endDate: queryRef.value.queryParam.dateRangeArray[1],
    holeDay: queryRef.value.queryParam.holeDay,
    saleTime: queryRef.value.queryParam.saleTime,
  }).then((res) => {
    tableData.value = res

  });
}
function deleteQuery(){
  axios.post(AxiosUrl.stock.stockPredict.deleteByQuery, {
    id: queryRef.value.queryParam.id.join(),
    buyTime: queryRef.value.queryParam.buyTime,
    beginDate: queryRef.value.queryParam.dateRangeArray[0],
    endDate: queryRef.value.queryParam.dateRangeArray[1],
    holeDay: queryRef.value.queryParam.holeDay,
    saleTime: queryRef.value.queryParam.saleTime,
  }).then(() => {

        query();
      }
  )
}
function deleteInfo(row) {

  axios.post(AxiosUrl.stock.stockPredict.deleteById, {
    id: row.id,
  }).then(() => {

        query();
      }
  )

}

function getIncreaseRate(row) {
  let increaseRate = Number((row.salePrice - row.buyPrice) / row.buyPrice * 100).toFixed(2);

 return getColor(increaseRate);

}

function  getColor(increaseRate){
  if (increaseRate > 10) {
    return {color: '#f6061b'}
  }
  if (increaseRate > 5) {
    return {color: '#cb1d2c'}
  }
  if (increaseRate > 0) {
    return {color: '#8d3a42'}
  }
  if (increaseRate < -10) {
    return {color: '#06f806'}
  }
  if (increaseRate < 0) {
    return {color: '#2cb42c'}
  }
}


function formatter(row, column, cellValue, index) {
  if (column.property.indexOf('市值') != -1) {
    return forMatterMoneyNum(cellValue);
  } else if (column.property.indexOf('金额') != -1 && column.property.indexOf('{/}') == -1) {
    return forMatterMoneyNum(cellValue);
  } else if (column.property.indexOf('封单额') != -1) {
    return forMatterMoneyNum(cellValue);
  } else if (column.property.indexOf('封单量') != -1 && column.property.indexOf('占') == -1) {
    return (Number(cellValue) / 100 / 10000).toFixed(2) + '万';
  } else if (column.property.indexOf('换手') != -1) {
    return Number(cellValue).toFixed(2) + '%';
  } else if (column.property.indexOf('涨幅') != -1 || column.property.indexOf('涨跌幅') != -1) {
    return Number(cellValue).toFixed(2) + '%';
  } else {
    return cellValue;
  }
}

function forMatterRate(cellValue) {
  return Number(cellValue).toFixed(2) + '%';

}


function forMatterMoneyNum(cellValue) {
  if (Number(cellValue) / 10000 / 10000 > 1) {
    return (Number(cellValue) / 10000 / 10000).toFixed(2) + '亿';
  } else {
    return (Number(cellValue) / 10000).toFixed(2) + '千万';
  }
}


function excute() {
  axios.post(AxiosUrl.stock.stockPredict.execute, {
    id: queryRef.value.queryParam.id.join(),
    buyTime: queryRef.value.queryParam.buyTime,
    beginDate: queryRef.value.queryParam.dateRangeArray[0],
    endDate: queryRef.value.queryParam.dateRangeArray[1],
    holeDay: queryRef.value.queryParam.holeDay,
    saleTime: queryRef.value.queryParam.saleTime,
  }).then((res) => {

  });
}

onMounted(() => {
  query();
})
</script>

<style scoped>

</style>
