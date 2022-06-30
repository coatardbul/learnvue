
<template>
  <el-form :inline="true" v-model="queryParam" class="demo-form-inline">
    <el-form-item label="code">
      <el-input v-model="queryParam.code" placeholder="id精确查询"></el-input>
    </el-form-item>
    <el-form-item label="name">
      <el-input v-model="queryParam.name" ></el-input>
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
import { reactive} from 'vue'

export default {
  name:'FormLine',
  setup(props,context){
    const queryParam = reactive({
      code: '',
      name: '',
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
