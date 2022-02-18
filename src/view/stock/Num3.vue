<template>
  <div class="block">
    <!--    <el-button @click="getAllStockInfo">查询</el-button>-->
  </div>
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
  </el-table>
</template>
<script setup>
import axios from 'axios';
import  AxiosUrl from '/src/constant/AxiosUrl'
import {onMounted, reactive} from 'vue'

const tableData = reactive([])

function addHot(id){
  axios.post(AxiosUrl.river.stockTemplate.addHot,{
    id:id
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

onMounted(() => {
  getAllStockInfo();
})

function getAllStockInfo() {
  axios.get(AxiosUrl.river.stockTemplate.getList).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

</script>
