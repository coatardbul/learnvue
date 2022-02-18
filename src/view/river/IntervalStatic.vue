<template>
  <div class="block">
    <!--    <el-button @click="getAllStockInfo">查询</el-button>-->
  </div>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column label="间隔分钟" width="180">
      <template #default="scope">
        <router-link :to="{path:'/intervalTime',query:{erb:scope.row.intervalNum}}">{{scope.row.intervalNum }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="间隔时间数量" width="200">
      <template #default="scope">
        <span>{{ scope.row.timeCount }}</span>
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
  axios.post(AxiosUrl.river.intervalTime.getIntervalStatic).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

</script>
