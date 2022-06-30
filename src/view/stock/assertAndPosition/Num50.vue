<template>
  <div>
    <table class="zichan" style="width:100%;">
      <tbody>
      <tr class="tb-tr-bot lh300">
        <td class="tb-tr-right pad-box"><span>总资产:</span><span class="padl10"><span class="red">{{ assertInfo.Zzc }}</span></span>
        </td>
        <td class="pad-box"><span>总市值:</span><span class="padl10"><span class=""><span
            class="red">{{ assertInfo.Zxsz }}</span></span></span></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class="tb-tr-right lh100 pad-box"><span>可用资金</span><span class="padl10"><span class="">{{ assertInfo.Kyzj }}</span></span>
        </td>
        <td class="tb-tr-right pad-box"><span>持仓盈亏</span><span class="padl10"><span class="green">{{ assertInfo.Ljyk }}</span></span>
        </td>
        <td class="pad-box"><span>资金余额</span><span class="padl10"><span class="">{{ assertInfo.Zjye }}</span></span></td>
      </tr>
      <tr>
        <td class="tb-tr-right lh100 pad-box"><span>可取资金</span><span class="padl10"><span class="">{{ assertInfo.Kqzj }}</span></span>
        </td>
        <td class="tb-tr-right pad-box"><span>当日参考盈亏</span><span class="padl10"><span>{{ assertInfo.Djzj }}</span></span></td>
        <td class="pad-box"><span>冻结资金</span><span class="padl10">{{ assertInfo.Djzj }}</span></td>
      </tr>
      </tbody>
    </table>
  </div>


  <el-table :data="assertDetailArr" border highlight-current-row
            style="width: 100%">
    <el-table-column type="index" width="50"/>
    <el-table-column label="代码" width="100">
      <template #default="scope">
        <span>{{ scope.row.Zqdm }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" width="100">
      <template #default="scope">
        <span>{{ scope.row.Zqmc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="持仓数量"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.Gfye }}</span>
      </template>
    </el-table-column>
    <el-table-column label="可用数量"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.Kysl }}</span>
      </template>
    </el-table-column>
    <el-table-column label="成本价"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.Ckcbj }}</span>
      </template>
    </el-table-column>
    <el-table-column label="当前价"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.Zxjg }}</span>
      </template>
    </el-table-column>
    <el-table-column label="最新市值"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.Zxsz }}</span>
      </template>
    </el-table-column>
    <el-table-column label="浮动盈亏"
                     width="100">
      <template #default="scope">
        <span>{{ scope.row.Ckyk }}</span>
      </template>
    </el-table-column>
    <el-table-column label="盈亏比例(%)"
                     width="100">
      <template #default="scope">
        <span>{{ Number(scope.row.Ykbl)*100 }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button type="text" @click="deleteInfo(scope.row)">买入</el-button>
        <DialogMenuDetail  :strategy-info="scope.row">{{
           卖出
          }}
        </DialogMenuDetail>
      </template>
    </el-table-column>

  </el-table>

</template>

<script setup>

import {onMounted, reactive} from "vue";
import DialogMenuDetail from './DialogMenuDetail'


import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";


const assertInfo = reactive({})
const assertDetailArr = reactive([])


function getAssertInfo() {
  axios.post(AxiosUrl.stock.trade.queryAssetAndPosition).then((res) => {
    if (res) {
      let parse = JSON.parse(res);
      Object.assign(assertInfo, parse[0]);
      assertDetailArr.length=0;
      Object.assign(assertDetailArr, assertInfo.positions);
    }
  });
}

onMounted(() => {
  getAssertInfo();
})

</script>

<style scoped>

</style>
