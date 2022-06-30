<template>
  <el-button :type="text" @click="dialogFormVisible=true"
  >编辑
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="买入配置表" append-to-body>
    <el-form :model="strategyInfo">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.id" disabled ></el-input>
      </el-form-item>
      <el-form-item label="模板id" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.templateId" ></el-input>
      </el-form-item>
      <el-form-item label="模板名称" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.templateName" ></el-input>
      </el-form-item>
      <el-form-item label="总金额" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.allMoney" ></el-input>
      </el-form-item>
      <el-form-item label="剩余金额" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.subMoney" ></el-input>
      </el-form-item>
      <el-form-item label="仓位占比" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.proportion" ></el-input>
      </el-form-item>
      <el-form-item label="总次数" :label-width="formLabelWidth">
        <el-input-number v-model="strategyInfo.allNum"  :step="1"/>
      </el-form-item>
      <el-form-item label="剩余次数" :label-width="formLabelWidth">
        <el-input-number v-model="strategyInfo.subNum"  :step="1"/>
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="strategyInfo.type"  class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in buyTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="clickConfirmDialog"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {inject, onMounted, reactive, ref} from 'vue'
import Button from '/src/constant/Button'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import enumInfo from "@/constant/Enum";


export default {
  name: 'DialogMenuDetail',
  props: {
    strategyInfo: {
      type: Object,
      default: function () {
        return {
          id: '',
          url: '',
          sign:'',
          // remark: 1,
          // type: 1,
        }
      }
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '80px'

    const buyTypeList = enumInfo.buyTypeList;

    function clickConfirmDialog() {
      axios.post(AxiosUrl.stock.trade.modifyBuyInfo, props.strategyInfo).then()
      dialogFormVisible.value = false
    }

    return {
      dialogFormVisible, formLabelWidth, clickConfirmDialog,buyTypeList
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
