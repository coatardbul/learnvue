
<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item label="id">
      <el-input v-model="queryParam.id" placeholder="id精确查询"></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="queryParam.name" ></el-input>
    </el-form-item>
    <el-form-item label="例子">
      <el-input v-model="queryParam.exampleStr" ></el-input>
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
      id: '',
      name: '',
      exampleStr:''
    })
    function queryInfo() {
      context.emit('query-strategy',queryParam)
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
