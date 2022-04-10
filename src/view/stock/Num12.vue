<template>
  <div class="block">
    <!--    <el-button @click="getAllStockInfo">查询</el-button>-->
  </div>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column label="id" width="180" >
      <template #default="scope">
        <span>{{ scope.row.id}}</span>
      </template>
    </el-table-column>
    <el-table-column label="统计纬度" width="100">
      <template #default="scope">
        <span>{{ scope.row.staticLatitude }}</span>
      </template>
    </el-table-column>
    <el-table-column label="对象标识" width="200">
      <template #default="scope">
        <span>{{ scope.row.objectEnumSign }}</span>
      </template>
    </el-table-column>
    <el-table-column label="说明" width="200">
      <template #default="scope">
        <span>{{ scope.row.remark }}</span>
      </template>
    </el-table-column>
    <el-table-column label="排序信息" width="200">
      <template #default="scope">
        <span>{{ scope.row.orderBy }}</span>
      </template>
    </el-table-column>
    <el-table-column label="对象信息" width="500">
      <template #default="scope">
        <span>{{ scope.row.objectJson }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import axios from 'axios';
import  AxiosUrl from '/src/constant/AxiosUrl'
import {onMounted, reactive} from 'vue'

const tableData = reactive([])


onMounted(() => {
  getIntervalStatic();
})

function getIntervalStatic() {
  axios.post(AxiosUrl.stock.staticTemplate.findAll,{}).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

</script>
