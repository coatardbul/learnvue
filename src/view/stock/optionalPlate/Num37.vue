<template>
  <FormLIne   ref="queryRef" @query-strategy="queryStrategy"  ></FormLIne>
  <DialogDetail :button-info="addButtonInfo" :strategy-info="strategyInfo"></DialogDetail>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="180">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" width="200">
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="标识"
                     width="250">
      <template #default="scope">
        <span>{{ scope.row.plateSign }}</span>
      </template>
    </el-table-column>
    <el-table-column label="说明"
                     width="300">
      <template #default="scope">
        <span>{{ scope.row.remark }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <DialogDetail :button-info="editInfo" :strategy-info="scope.row">{{
            buttonInfo.buttonName
          }}
        </DialogDetail>
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
import DialogDetail from '@/view/stock/optionalPlate/DialogDetail'
import {ref} from "vue";
import Button from "@/constant/Button";
const tableData = reactive([])
const strategyInfo=ref({})
const addButtonInfo = ref({
  buttonName: Button.buttonStatus.add.name,
  buttonUrl: AxiosUrl.stock.stockOptionalPlate.add,
  buttonType: 'button'
})

const queryRef = ref({})

const editInfo = reactive(
    {
      buttonName: Button.buttonStatus.edit.name,
      buttonUrl: AxiosUrl.stock.stockOptionalPlate.modify,
    })
function queryStrategy(){
  getAllStockInfo(queryRef.value.queryParam);

}

onMounted(() => {
  getAllStockInfo(queryRef.value.queryParam);
})

function deleteInfo(row){
  axios.post( AxiosUrl.stock.stockOptionalPlate.delete,{
    id:row.id,
  }).then(()=>{

        getAllStockInfo(queryRef.value.queryParam);
      }
  )
}
function getAllStockInfo(queryParam) {
  tableData.length=0;
  axios.post(AxiosUrl.stock.stockOptionalPlate.findAll,{
    id:queryParam==null ?null:queryParam.id,
    code:queryParam==null ?null:queryParam.code,
    name:queryParam==null ?null:queryParam.name,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
    // tableData.data=res;
  });
}

</script>
