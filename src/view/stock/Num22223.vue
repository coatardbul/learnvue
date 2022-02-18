<template>
  <div class="block">
<!--    <el-button @click="getAllStockInfo">查询</el-button>-->
  </div>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180"/>
    <el-table-column prop="name" label="名称" width="200"/>
    <el-table-column prop="exampleStr" label="例子" width="600"/>
    <el-table-column prop="scriptStr" label="脚本" width="600"/>
  </el-table>
</template>
<script setup>
import axios from 'axios';

import {onMounted, reactive} from 'vue'

const tableData = reactive([])
onMounted(() => {
  getAllStockInfo();
})

function getAllStockInfo() {
  axios.get("river/api/stockTemplate/getList").then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

</script>
