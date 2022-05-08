<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item>
      <el-select
          filterable
          clearable
          v-model="queryParam.parentMenuId"
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
    <el-form-item label="菜单名称">
      <el-input v-model="queryParam.menuName"></el-input>
    </el-form-item>
    <el-form-item label="路由地址">
      <el-input v-model="queryParam.routerUrl"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="queryInfo">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {onMounted, provide, reactive, ref} from 'vue'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name: 'FormLine',
  setup(props, context) {
    const queryParam = reactive({
      parentMenuId: '',
      menuName: '',
      routerUrl: ''
    })
    const parentMenuList = ref([])

    function queryInfo() {
      context.emit('query-menu', queryParam)
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
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
      queryParam, queryInfo, reset, parentMenuList
    }
  }
}

</script>
