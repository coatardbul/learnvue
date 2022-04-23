<template>
  <!-- Form -->
  <el-button type="text" @click="dialogFormVisible=true"
  >添加板块
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="自选板块" append-to-body>

    <el-table :data="tableData" border highlight-current-row
              @selection-change="selectChange"
              style="width: 100%">
      <el-table-column type="index" width="50"/>
      <el-table-column type="selection" fixed width="55"/>
      <el-table-column label="id" width="180">
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标识"
                       width="250">
        <template #default="scope">
          <span>{{ scope.row.plateSign }}</span>
        </template>
      </el-table-column>
    </el-table>
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
import AxiosUrl from "@/constant/AxiosUrl";


export default {
  name: 'DialogMenuDetail',
  setup(props,context) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '50px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)

    const tableData = ref([])

    const mulPlateArr = ref([])


    function selectChange(val) {
      mulPlateArr.value = val;
    }


    onMounted(()=>{
      tableData.value.length=0;
      axios.post(AxiosUrl.stock.stockOptionalPlate.findAll,{
      }).then((res) => {
        res.forEach(v => {
          tableData.value.push(v);
        })
      });
    })

    function clickConfirmDialog() {
      dialogFormVisible.value = false
      context.emit('click-confirm')
    }

    return {
      dialogFormVisible, formLabelWidth, clickConfirmDialog, cancelName, confirmName,selectChange,tableData,mulPlateArr
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
