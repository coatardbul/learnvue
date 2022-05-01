<template>
  <!-- Form -->
  <el-button :type="buttonInfo.buttonType" @click="dialogFormVisible=true"
  >{{ buttonInfo.buttonName }}
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="策略问句信息" append-to-body>
    <el-calendar>
      <template #dateCell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
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
          todayStr:'',
          scriptStr: '',
          remark:'',
          hotValue: '',
        }
      }
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '100px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)


    function clickConfirmDialog() {
      axios.post(props.buttonInfo.buttonUrl, {
        id: props.strategyInfo.id,
        name: props.strategyInfo.name,
        exampleStr: props.strategyInfo.exampleStr,
        todayStr: props.strategyInfo.todayStr,
        scriptStr: props.strategyInfo.scriptStr,
        templateSign: props.strategyInfo.templateSign,
        remark: props.strategyInfo.remark,
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
