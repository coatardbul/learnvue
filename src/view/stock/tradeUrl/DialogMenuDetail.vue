<template>
  <!-- Form -->
  <el-button :type="buttonInfo.buttonType" @click="dialogFormVisible=true"
  >{{ buttonInfo.buttonName }}
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="策略问句信息" append-to-body>
    <el-form :model="strategyInfo">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.id" disabled ></el-input>
      </el-form-item>
      <el-form-item label="url" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.url" a type="textarea" utocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标识" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.sign"  type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="说明" :label-width="formLabelWidth">
        <el-input v-model="strategyInfo.remark" type="textarea"></el-input>
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
    const formLabelWidth = '50px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)


    function clickConfirmDialog() {
      axios.post(props.buttonInfo.buttonUrl, {
        id: props.strategyInfo.id,
        url: props.strategyInfo.url,
        sign: props.strategyInfo.sign,
        remark: props.strategyInfo.remark,
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
