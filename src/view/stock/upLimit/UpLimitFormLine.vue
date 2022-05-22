<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
   <TradeDateForm :date-str="queryParam.dateStr"
                  @date-change="dateChange"
   ></TradeDateForm>
    <el-form-item >
      <el-button type="primary" @click.prevent="getQuery">查询</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";
import ConfigInfo from '/src/constant/ConfigInfo'
import {onMounted, reactive, ref, watch} from "vue";
import AxiosUrl from "@/constant/AxiosUrl";
import axios from "axios";
import TradeDateForm from '@/components/TradeDateForm'
export default {
  name: "EmotionMinuteFormLine.vue",
  components:{
    TradeDateForm,
  },
  setup(props, context) {
    const queryParam = reactive({
      dateStr: ConfigInfo.nowDate,
    })

    function dateChange(dateVal){
      queryParam.dateStr=dateVal;
      getQuery();
    }


    function getQuery() {
      context.emit('query', queryParam)
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }

    onMounted(() => {
    })

    return {
      getQuery,
      reset,
      dateChange,
      queryParam,

    }
  }
}
</script>

<style scoped>

</style>
