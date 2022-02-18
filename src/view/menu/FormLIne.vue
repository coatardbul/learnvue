
<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item label="父节点id">
      <el-input v-model="queryParam.parentMenuId" placeholder="父节点id精确查询"></el-input>
    </el-form-item>
    <el-form-item label="菜单名称">
      <el-input v-model="queryParam.menuName" ></el-input>
    </el-form-item>
    <el-form-item label="路由地址">
      <el-input v-model="queryParam.routerUrl" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="queryInfo">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script >
import {provide, reactive} from 'vue'

export default {
  name:'FormLine',
  setup(props,context){
    const queryParam = reactive({
      parentMenuId: '',
      menuName: '',
      routerUrl:''
    })
    function queryInfo() {
      context.emit('query-menu',queryParam)
    }
    function reset(){
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }
    return{
      queryParam,queryInfo,reset
    }
  }
}

</script>
