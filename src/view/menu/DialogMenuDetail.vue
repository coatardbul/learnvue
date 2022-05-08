<template>
  <!-- Form -->
  <el-button :type="buttonInfo.buttonType" @click="dialogFormVisible=true"
  >{{ buttonInfo.buttonName }}
  </el-button
  >
  <el-dialog v-model="dialogFormVisible" title="菜单信息" append-to-body>
    <el-form :model="menuInfo">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="menuInfo.id" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="父节点id" :label-width="formLabelWidth">
        <el-select
            filterable
            clearable
            v-model="menuInfo.parentMenuId"
            placeholder="Select"
            style="width: 240px"
        >
          <el-option
              v-for="item in parentMenuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="menuInfo.menuName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" :label-width="formLabelWidth">
        <el-input v-model="menuInfo.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="路由" :label-width="formLabelWidth">
        <el-input v-model="menuInfo.routerUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="顺序" :label-width="formLabelWidth">
        <el-input v-model="menuInfo.sequent" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="menuInfo.status" placeholder="请选择状态">
          <el-option label="删除" value="0"></el-option>
          <el-option label="新增" value="1"></el-option>
        </el-select>
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
    menuInfo: {
      type: Object,
      default: function () {
        return {
          id: '',
          parentMenuId: '',
          menuName: '',
          icon: '',
          routerUrl: '',
          sequent: '',
          status: '',
        }
      }
    }
  },
  setup(props) {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const confirmName = ref(Button.buttonStatus.confirm.name)
    const cancelName = ref(Button.buttonStatus.cancel.name)
    const parentMenuList = ref([])


    function clickConfirmDialog() {
      axios.post(props.buttonInfo.buttonUrl, {
        id: props.menuInfo.id,
        parentMenuId: props.menuInfo.parentMenuId,
        menuName: props.menuInfo.menuName,
        icon: props.menuInfo.icon,
        routerUrl: props.menuInfo.routerUrl,
        sequent: props.menuInfo.sequent,
        status: props.menuInfo.status,
      }).then()
      dialogFormVisible.value = false
    }

    onMounted(() => {
      axios.post(AxiosUrl.river.menu.getAllMenu, {
        parentMenuId: 0
      }).then((res) => {
        parentMenuList.value.length = 0
        res.forEach(templateInfo => {
          let templateTemp = {
            label: templateInfo.menuName,
            value: templateInfo.id,
          }
          parentMenuList.value.push(templateTemp);
        })
      });
    })
    return {
      dialogFormVisible, formLabelWidth, clickConfirmDialog, cancelName, confirmName,parentMenuList
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
