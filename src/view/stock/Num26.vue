<template>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="190">
      <template #default="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="ip" width="180">
      <template #default="scope">
        <span>{{ scope.row.ip }}</span>
      </template>
    </el-table-column>
    <el-table-column label="端口"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.port }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="国家" width="100"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.country }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="省" width="100"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.province }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="城市" width="150"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.city }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="创建时间" width="300"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ format(scope.row.createTime) }}</span>
      </template>
    </el-table-column>
    <el-table-column  label="使用次数" width="120"  :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.useTime }}</span>
      </template>
    </el-table-column>

  </el-table>
</template>
<script setup>
import axios from 'axios';
import  AxiosUrl from '/src/constant/AxiosUrl'
import {onMounted, reactive} from 'vue'
import moment from "moment";
const tableData = reactive([])


onMounted(() => {
  getAllIpInfo();
})

function format(time){
  return  moment(time).format('YYYY-MM-DD HH:mm:ss');
}

function getAllIpInfo() {
  tableData.length=0;
  axios.post(AxiosUrl.stock.ip.getAllIps,{
  }).then((res) => {
    res.forEach(ipInfo=>{
      tableData.push(ipInfo);
    })
  });
}

</script>
