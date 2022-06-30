<template>
  <!-- Form -->
  <el-button :type="buttonInfo.buttonType" @click="dialogFormVisible=true"
  >{{ buttonInfo.buttonName }}
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="策略问句信息" append-to-body>
    <el-form :model="strategyInfo">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.id" ></el-input>
      </el-form-item>
      <el-form-item label="模板id" :label-width="formLabelWidth">
        <el-select
            filterable
            v-model="strategyInfo.templatedId"
            placeholder="Select"
            style="width: 240px"
        >
          <el-option
              v-for="item in templateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.beginTime"  ></el-input>
      </el-form-item>
      <el-form-item label="结束时间" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.endTime" ></el-input>
      </el-form-item>
      <el-form-item label="是否打开交易" :label-width="formLabelWidth">
        <el-select v-model="strategyInfo.isOpenTrade" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in isOpenTradeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="查看等级" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.watchLevel" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="模拟策略标识" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.strategySign" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="strategyInfo.type" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="买入条件对象" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.buyCondition"   type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ cancelName }}</el-button>
        <el-button type="primary" @click="clickConfirmDialog"
        >{{ confirmName }}</el-button
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
    buttonInfo: {
      type: Object,
      default: function () {
        return {
          buttonName: Button.buttonStatus.edit.name,
          buttonUrl: '',
          buttonType: 'text'
        }
      }
    },
    templateList:{
      type: Array
    },
    strategyInfo: {
      type: Object,
      default: function () {
        return {
          id: '',
          templatedId: '',
          beginTime:'',
          endTime:'',
          isOpenTrade: 0,
          // type: 1,
        }
      }
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '50px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)

    const isOpenTradeList=enumInfo.isOpenTradeList;
    const typeList=enumInfo.typeList;


    function clickConfirmDialog() {
      axios.post(props.buttonInfo.buttonUrl, {
        id: props.strategyInfo.id,
        templatedId: props.strategyInfo.templatedId,
        beginTime: props.strategyInfo.beginTime,
        endTime: props.strategyInfo.endTime,
        isOpenTrade: props.strategyInfo.isOpenTrade,
        watchLevel: props.strategyInfo.watchLevel,
        strategySign: props.strategyInfo.strategySign,
        buyCondition: props.strategyInfo.buyCondition,
        type: props.strategyInfo.type,
      }).then()
      dialogFormVisible.value = false
    }

    onMounted(()=>{



    })

    return {
      dialogFormVisible, formLabelWidth, clickConfirmDialog, cancelName, confirmName,isOpenTradeList,typeList
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
