
<template>
  <el-form :inline="true" v-model="queryParam" class="demo-form-inline">
    <el-form-item label="id">
      <el-input v-model="queryParam.id" placeholder="id精确查询"></el-input>
    </el-form-item>
    <el-form-item label="url">
      <el-input v-model="queryParam.url" ></el-input>
    </el-form-item>
    <el-form-item label="说明">
      <el-input v-model="queryParam.remark" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="queryInfo">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="sysnBuyInfo">同步配置信息</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="initBuyInfo">初始化金额</el-button>
    </el-form-item>

  </el-form>
</template>

<script >
import { reactive} from 'vue'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name:'FormLine',
  setup(props,context){
    const queryParam = reactive({
      id: '',
      url: '',
      remark:''
    })
    function sysnBuyInfo() {
      axios.post(AxiosUrl.stock.trade.syncBuyInfo, {
      }).then()
    }
    function initBuyInfo() {
      axios.post(AxiosUrl.stock.trade.initBuyInfo, {
      }).then()
    }

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
      queryParam,queryInfo,reset,sysnBuyInfo,initBuyInfo
    }
  }
}

</script>
