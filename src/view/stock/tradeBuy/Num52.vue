<template>
  <FormLIne ref="queryRef" @query-strategy="queryStrategy"></FormLIne>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="180">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="模板ID" width="180">
      <template #default="scope">
        <span>{{ scope.row.templateId }}</span>
      </template>
    </el-table-column>
    <el-table-column label="模板名称" width="250">
      <template #default="scope">
        <span>{{ scope.row.templateName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="总金额" width="100">
      <template #default="scope">
        <span>{{ scope.row.allMoney }}</span>
      </template>
    </el-table-column>
    <el-table-column label="剩余金额" width="200">
      <template #default="scope">
        <span>{{ scope.row.subMoney }}</span>
      </template>
    </el-table-column>
    <el-table-column label="仓位占比" width="200">
      <template #default="scope">
        <span>{{ scope.row.proportion }}</span>
      </template>
    </el-table-column>
    <el-table-column label="总次数" width="50">
      <template #default="scope">
        <span>{{ scope.row.allNum }}</span>
      </template>
    </el-table-column>
    <el-table-column label="剩余次数" width="50">
      <template #default="scope">
        <span>{{ scope.row.subNum }}</span>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="200">
      <template #default="scope">
          <el-select v-model="scope.row.type" disabled class="m-2" placeholder="Select" size="large">
            <el-option
                v-for="item in buyTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <DialogMenuDetail :strategy-info="scope.row">xxx
        </DialogMenuDetail>
        <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import axios from 'axios';
import AxiosUrl from '/src/constant/AxiosUrl'
import {onMounted, reactive} from 'vue'
import FormLIne from './FormLIne'
import DialogMenuDetail from './DialogMenuDetail'
import {ref} from "vue";
import enumInfo from "@/constant/Enum";

const tableData = reactive([])

const queryRef = ref({})
const buyTypeList = enumInfo.buyTypeList;


function queryStrategy() {
  getAllStockInfo(queryRef.value.queryParam);

}

onMounted(() => {
  getAllStockInfo(queryRef.value.queryParam);
})

function deleteInfo(row) {
  axios.post(AxiosUrl.stock.trade.deleteBuyInfo, {
    id: row.id,
  }).then(() => {
        getAllStockInfo(queryRef.value.queryParam);
      }
  )

}


function getAllStockInfo(queryParam) {
  tableData.length = 0;
  axios.post(AxiosUrl.stock.trade.queryBuyInfo, {
  }).then((res) => {
    tableData.length=0;
    Object.assign(tableData,res);
  });
}

</script>
