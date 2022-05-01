<template>
  <FormLIne   ref="queryRef" @query-strategy="queryStrategy"  ></FormLIne>
  <DialogMenuDetail :button-info="addButtonInfo" :strategy-info="strategyInfo"></DialogMenuDetail>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="190">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="code" width="150">
      <template #default="scope">
        <span>{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" width="200">
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="开始时间"
                     width="200">
      <template #default="scope">
        <span>{{ scope.row.beginDate }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="结束时间" width="200"  >
      <template #default="scope">
        <span>{{ scope.row.endDate }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="300">
      <template #default="scope">
        <DialogMenuDetail :button-info="editInfo" :strategy-info="scope.row">{{
            buttonInfo.buttonName
          }}
        </DialogMenuDetail>
        <el-button type="text"   @click="deleteInfo(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import axios from 'axios';
import  AxiosUrl from '/src/constant/AxiosUrl'
import {onMounted, reactive} from 'vue'
import FormLIne from './FormLIne'
import DialogMenuDetail from './DialogMenuDetail'
import {ref} from "vue";
import Button from "@/constant/Button";
const tableData = reactive([])
const strategyInfo=ref({})
const editInfo = ref({
  buttonName: '查看详情',
  buttonUrl: AxiosUrl.river.stockTemplate.add,
  buttonType: 'text'
})

const queryRef = ref({})


function queryStrategy(){
  getAllStockInfo(queryRef.value.queryParam);

}

onMounted(() => {
  getAllStockInfo(queryRef.value.queryParam);
})

function deleteInfo(row){
  axios.post(AxiosUrl.river.stockTemplate.delete,{
    id:row.id,
  }).then(()=>{

        getAllStockInfo(queryRef.value.queryParam);
      }
  )

}



function getAllStockInfo(queryParam) {
  tableData.length=0;
  axios.post(AxiosUrl.stock.stockAnomalousBehavior.getAbStatic,{
    plateList: queryParam == null ? null : queryParam.plateIdArr,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
    // tableData.data=res;
  });
}

</script>
