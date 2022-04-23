<template>
  <FormLIne ref="queryRef" @query-strategy="queryStrategy"></FormLIne>
  <DialogMenuDetail :button-info="addButtonInfo" :strategy-info="strategyInfo"
                    :plate-list="plateList"></DialogMenuDetail>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="180">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="code" width="200">
      <template #default="scope">
        <span>{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column label="name"
                     width="200">
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="板块名称" width="200" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.plateName }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <DialogMenuDetail :button-info="editInfo" :strategy-info="scope.row"
                          :plate-list="plateList">{{
            buttonInfo.buttonName
          }}
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
import Button from "@/constant/Button";

const tableData = reactive([])
const strategyInfo = ref({})
const addButtonInfo = ref({
  buttonName: Button.buttonStatus.add.name,
  buttonUrl: AxiosUrl.stock.stockOptionalPool.add,
  buttonType: 'button'
})

const queryRef = ref({})
const plateList = ref([])

const editInfo = reactive(
    {
      buttonName: Button.buttonStatus.edit.name,
      buttonUrl: AxiosUrl.stock.stockOptionalPool.modify,
    })

function queryStrategy() {
  getAllStockInfo(queryRef.value.queryParam);

}

onMounted(() => {
  getAllStockInfo(queryRef.value.queryParam);
  getAllPlateInfo();
})

function deleteInfo(row) {
  axios.post(AxiosUrl.stock.stockOptionalPool.delete, {
    id: row.id,
  }).then(() => {

        getAllStockInfo(queryRef.value.queryParam);
      }
  )
}

function getAllPlateInfo() {
  plateList.value.length = 0;
  axios.post(AxiosUrl.stock.stockOptionalPlate.findAll, {}).then((res) => {
    res.forEach(v => {
      plateList.value.push(v);
    })
    // tableData.data=res;
  });
}

function getAllStockInfo(queryParam) {
  tableData.length = 0;
  axios.post(AxiosUrl.stock.stockOptionalPool.findAll, {
    plateList: queryParam == null ? null : queryParam.plateIdArr,
    name: queryParam == null ? null : queryParam.name,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
    // tableData.data=res;
  });
}

</script>
