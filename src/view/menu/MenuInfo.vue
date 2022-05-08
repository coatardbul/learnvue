<template>
  <FormLIne ref="queryRef" @query-menu="queryMenuInfo"></FormLIne>
  <DialogMenuDetail :button-info="addButtonInfo" :menu-info="menuInfo"></DialogMenuDetail>

  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column fixed type="index" width="50"/>
    <el-table-column fixed label="id" width="180">
      <template #default="scope">
        <router-link :to="{path:scope.row.routerUrl==null?'':scope.row.routerUrl}">{{ scope.row.id }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="父节点id" width="200">
      <template #default="scope">
        <span>{{ scope.row.parentMenuId }}</span>
      </template>
    </el-table-column>
    <el-table-column label="菜单名称" width="200">
      <template #default="scope">
        <span>{{ scope.row.menuName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="路由地址" width="200">
      <template #default="scope">
        <span>{{ scope.row.routerUrl }}</span>
      </template>
    </el-table-column>
    <el-table-column label="顺序" width="200">
      <template #default="scope">
        <span>{{ scope.row.sequent }}</span>
      </template>
    </el-table-column>
    <el-table-column label="图标" width="200">
      <template #default="scope">
        <span>{{ scope.row.icon }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="200">
      <template #default="scope">
        <span>{{ scope.row.status }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <DialogMenuDetail :button-info="buttonInfo" :menu-info="scope.row">{{
            buttonInfo.buttonName
          }}
        </DialogMenuDetail>
        <el-button type="text" @click="deleteInfo(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup>
import {inject, onMounted, onUpdated, reactive, ref} from "vue";
import FormLIne from './FormLIne'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import Button from '@/constant/Button'
import DialogMenuDetail from './DialogMenuDetail'

const tableData = reactive([])
const menuInfo = ref({})
const addButtonInfo = ref({
  buttonName: Button.buttonStatus.add.name,
  buttonUrl: AxiosUrl.river.menu.addMenu,
  buttonType: 'button'
})
const queryRef=ref({})
const buttonInfo = reactive(
    {
      buttonName: Button.buttonStatus.edit.name,
      buttonUrl: AxiosUrl.river.menu.editMenu
    })


function queryMenuInfo() {
  if(!queryRef.value){
    return;
  }
  tableData.length = 0
  axios.post(AxiosUrl.river.menu.getAllMenu, queryRef.value.queryParam).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}

function deleteInfo(row) {
  axios.post(AxiosUrl.river.menu.delete, {
    id: row.id,
  }).then(() => {
    queryMenuInfo();
      }
  )

}

function getAllMenuInfo() {
  tableData.length = 0
  axios.post(AxiosUrl.river.menu.getAllMenu, {}).then((res) => {
    res.forEach(v => {
      tableData.push(v)
    })
  })
}

onMounted(() => {
  getAllMenuInfo();
})
</script>

<style scoped>

</style>
