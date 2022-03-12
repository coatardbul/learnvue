<template>
  <FormLIne   ref="queryRef" @query-strategy="queryStrategy"  ></FormLIne>
  <DialogMenuDetail :button-info="addButtonInfo" :strategy-info="strategyInfo"></DialogMenuDetail>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="180">
      <template #default="scope">
        <router-link :to="{path:'/index4',query:{erb:scope.row.id}}" @click="addHot(scope.row.id)">{{scope.row.id }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="名称" width="200">
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="例子"
                     width="500">
      <template #default="scope">
        <span>{{ scope.row.exampleStr }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="脚本" width="500"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.scriptStr }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="点击量" width="120"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.hotValue }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
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
const addButtonInfo = ref({
  buttonName: Button.buttonStatus.add.name,
  buttonUrl: AxiosUrl.river.stockTemplate.add,
  buttonType: 'button'
})
function addHot(id){
  axios.post(AxiosUrl.river.stockTemplate.addHot,{
    id:id
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}
const queryRef = ref({})

const editInfo = reactive(
    {
      buttonName: Button.buttonStatus.edit.name,
      buttonUrl: AxiosUrl.river.stockTemplate.modify,
    })
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
  axios.post(AxiosUrl.river.stockTemplate.getList,{
    id:queryParam==null ?null:queryParam.id,
    name:queryParam==null ?null:queryParam.name,
    exampleStr:queryParam==null ?null:queryParam.exampleStr,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
    // tableData.data=res;
  });
}

</script>
