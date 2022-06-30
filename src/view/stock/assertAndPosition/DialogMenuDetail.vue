<template>
  <!-- Form -->
  <el-button :type="text" @click="dialogFormVisible=true"
  >卖出
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="卖出信息" append-to-body>
    <span>支持：1.YYYY年MM月DD日 2.HH点MM分 3.包含001001</span>
    <el-form :model="strategyInfo">
      <el-form-item label="代码"   :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.Zqdm"   ></el-input>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.Zqmc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.Zxjg" ></el-input>
      </el-form-item>
      <el-form-item label="最大可卖" :label-width="formLabelWidth">
        <el-input-number v-model="strategyInfo.Kysl" disabled :step="100" @change="handleChange" />
      </el-form-item>
      <el-form-item label="卖出数量" :label-width="formLabelWidth">
        <el-input-number v-model="strategyInfo.amount" :step="100" @change="handleChange" />
      </el-form-item>
      <el-form-item label="卖出类型" :label-width="formLabelWidth">
        <el-select v-model="strategyInfo.type" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in sellTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template v-if="strategyInfo.type==1">
        <el-form-item label="卖出日期" :label-width="formLabelWidth">
          <el-date-picker v-model="strategyInfo.sellDate" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day"></el-date-picker>
        </el-form-item>
        <el-form-item label="卖出时间" :label-width="formLabelWidth">
          <el-input v-model="strategyInfo.sellTime" autocomplete="off"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="卖出脚本" :label-width="formLabelWidth">
          <el-input v-model="strategyInfo.sellTime" autocomplete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="clickConfirmDialog"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {inject, onMounted, reactive, ref} from 'vue'
import Button from '/src/constant/Button'
import axios from "axios";
import enumInfo from '@/constant/Enum'
import AxiosUrl from "@/constant/AxiosUrl";


export default {
  name: 'DialogMenuDetail',
  props: {
    strategyInfo: {
      type: Object,
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '100px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)

    const sellTypeList = enumInfo.sellTypeList;

    function clickConfirmDialog() {
      axios.post(AxiosUrl.stock.trade.addSellInfo, {
          code:props.strategyInfo.Zqdm ,
          name: props.strategyInfo.Zqmc,
          amount: props.strategyInfo.amount,
          price: props.strategyInfo.Zxjg,
          type: props.strategyInfo.type,
          sellDate: props.strategyInfo.sellDate,
          sellTime: props.strategyInfo.sellTime,
        sellScript: props.strategyInfo.sellScript
      }).then()
      dialogFormVisible.value = false
    }

    return {
      dialogFormVisible, formLabelWidth, clickConfirmDialog, cancelName, confirmName,sellTypeList
    }
  }
}


</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
