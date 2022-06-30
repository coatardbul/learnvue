<template>
  <FormLIne ref="queryRef" @query-strategy="queryStrategy"></FormLIne>
  <DialogMenuDetail :button-info="addButtonInfo" :strategy-info="strategyInfo"></DialogMenuDetail>
  <el-table :data="tableData" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="id" width="180">
      <template #default="scope">
        <router-link :to="{path:'/index4',query:{erb:scope.row.id}}">{{ scope.row.id }}</router-link>
      </template>
    </el-table-column>
    <el-table-column label="模板id" width="200">
      <template #default="scope">
        <span>{{ scope.row.templatedId }}</span>
      </template>
    </el-table-column>

    <el-table-column label="模板名称" width="200">
      <template #default="scope">
        <span>{{ scope.row.templatedName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="开始时间"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.beginTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="结束时间"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.endTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="是否打开交易" width="150" :show-overflow-tooltip="true">
      <template #default="scope">
        <el-select v-model="scope.row.isOpenTrade" disabled class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in isOpenTradeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="监测等级" width="100" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.watchLevel }}</span>
      </template>
    </el-table-column>
    <el-table-column label="模拟策略标识" width="150" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.strategySign }}</span>
      </template>
    </el-table-column>

    <el-table-column label="类型" width="200" :show-overflow-tooltip="true">
      <template #default="scope">
        <el-select v-model="scope.row.type" disabled class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>

    <el-table-column label="买入条件" width="150" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ scope.row.buyCondition }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <DialogMenuDetail :button-info="editInfo" :strategy-info="scope.row">{{
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
import enumInfo from "@/constant/Enum";


const tableData = reactive([])
const strategyInfo = ref({})
const templateList = ref([])


const addButtonInfo = ref({
  buttonName: Button.buttonStatus.add.name,
  buttonUrl: AxiosUrl.stock.stockWatch.add,
  buttonType: 'button'
})

const queryRef = ref({})

const editInfo = reactive(
    {
      buttonName: Button.buttonStatus.edit.name,
      buttonUrl: AxiosUrl.stock.stockWatch.modify,
    })

function queryStrategy() {
  getAllStockInfo(queryRef.value.queryParam);

}

const isOpenTradeList = enumInfo.isOpenTradeList;
const typeList = enumInfo.typeList;

onMounted(() => {
  getAllStockInfo(queryRef.value.queryParam);
  getAllStemplate();
})

function deleteInfo(row) {
  axios.post(AxiosUrl.stock.stockWatch.delete, {
    id: row.id,
  }).then(() => {

        getAllStockInfo(queryRef.value.queryParam);
      }
  )

}


function getAllStockInfo(queryParam) {
  tableData.length = 0;
  axios.post(AxiosUrl.stock.stockWatch.findAll, {
    id: queryParam == null ? null : queryParam.id,
    templatedId: queryParam == null ? null : queryParam.templatedId,
    endTime: queryParam == null ? null : queryParam.endTime,
  }).then((res) => {
    res.forEach(v => {
      tableData.push(v);
    })
  });
}


function getAllStemplate() {
  axios.post(AxiosUrl.river.stockTemplate.getList, {}).then((res) => {
    templateList.value.length = 0
    res.forEach(templateInfo => {
      let templateTemp = {
        label: templateInfo.name,
        value: templateInfo.id,
      }
      templateList.value.push(templateTemp);
    })
  })
}

</script>
