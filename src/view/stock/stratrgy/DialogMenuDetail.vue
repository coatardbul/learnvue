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
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="例子" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.exampleStr"  type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="脚本" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.scriptStr" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="点击量" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.hotValue" autocomplete="off"></el-input>
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
    strategyInfo: {
      type: Object,
      default: function () {
        return {
          id: '',
          name: '',
          exampleStr:'',
          scriptStr: '',
          hotValue: '',
        }
      }
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '50px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)


    function clickConfirmDialog() {
      axios.post(props.buttonInfo.buttonUrl, {
        id: props.strategyInfo.id,
        name: props.strategyInfo.name,
        exampleStr: props.strategyInfo.exampleStr,
        scriptStr: props.strategyInfo.scriptStr,
        hotValue: props.strategyInfo.hotValue,
      }).then()
      dialogFormVisible.value = false
    }

    return {
      dialogFormVisible, formLabelWidth, clickConfirmDialog, cancelName, confirmName
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
