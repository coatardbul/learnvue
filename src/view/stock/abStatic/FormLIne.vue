
<template>
  <el-form :inline="true" v-model="queryParam" class="demo-form-inline">
    <el-form-item label="股票名称">
      <el-input v-model="queryParam.name" ></el-input>
    </el-form-item>
    <el-form-item label="自选板快">
      <el-select
          filterable
          clearable
          multiple
          v-model="queryParam.plateIdArr"
          placeholder="Select"
          style="width: 240px"
      >
        <el-option
            v-for="item in plateList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click.prevent="queryInfo">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click="reset">删除板块数据</el-button>
    </el-form-item>
  </el-form>
</template>

<script >
import {onMounted, reactive, ref} from 'vue'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name:'FormLine',
  setup(props,context){
    const queryParam = reactive({
      id: '',
      name: '',
      exampleStr:''
    })
    const plateList=ref([])
    function queryInfo() {
      context.emit('query-strategy',queryParam)
    }
    function reset(){
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }
    function getAllStockInfo() {
      plateList.value.length=0;
      axios.post(AxiosUrl.stock.stockOptionalPlate.findAll,{
      }).then((res) => {
        res.forEach(v => {
          plateList.value.push(v);
        })
        // tableData.data=res;
      });
    }
    onMounted(()=>{
      getAllStockInfo();
    })
    return{
      queryParam,queryInfo,reset,plateList
    }
  }
}

</script>
