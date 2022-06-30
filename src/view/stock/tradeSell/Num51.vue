<template>
  <FormLIne   ref="queryRef" @query-strategy="queryStrategy"  ></FormLIne>

  <el-table :data="sellArr" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id"  disabled  width="100">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="代码" width="100">
      <template #default="scope">
        <span>{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" width="100">
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖出数据"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.amount }}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖出价格"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column label="类型"
                     width="170">
      <template #default="scope">
        <el-select v-model="scope.row.type" disabled class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in sellTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="卖出日期"
                     width="130">
      <template #default="scope">
        <span>{{ scope.row.sellDate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖出时间"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.sellTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖出脚本"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.sellScript }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态"
                     width="150">
      <template #default="scope">
        <el-select v-model="scope.row.status" disabled class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in sellStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <dialog-menu-detail  :strategy-info="scope.row"></dialog-menu-detail>
        <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

</template>

<script setup>

import {onMounted, reactive} from "vue";
import DialogMenuDetail from './DialogMenuDetail'

import FormLIne from './FormLIne'

import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import {ref} from "vue";
import enumInfo from "@/constant/Enum";

const queryRef = ref({})

const sellArr = reactive([])

const sellTypeList = enumInfo.sellTypeList;

const sellStatusList = enumInfo.sellStatusList;

function getAssertInfo() {
  if(!queryRef.value.queryParam){
    return;
  }
  axios.post(AxiosUrl.stock.trade.querySellInfo,{
    code:queryRef.value.queryParam.code ,
    name: queryRef.value.queryParam.code,
  }).then((res) => {
    sellArr.length=0;
    Object.assign(sellArr,res);
  });
}


function deleteInfo(item){
  axios.post(AxiosUrl.stock.trade.deleteSellInfo,{
    id:item.id ,
  }).then((res)=>{
    getAssertInfo();
  });
}
onMounted(() => {
  getAssertInfo();
})

</script>

<style scoped>

</style>
