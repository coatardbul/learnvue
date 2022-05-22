<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
   <TradeDateForm :date-str="queryParam.dateStr"
                  @date-change="dateChange"
   ></TradeDateForm>
    <el-form-item label="对象标识" >
      <el-select
          filterable
          v-model="queryParam.objectSign"
          placeholder="Select"
          style="width: 240px"
      >
        <el-option
            v-for="item in objectSignList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="时间间隔">
      <el-input v-model="queryParam.timeInterval" type="number" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="时间" >
      <el-input v-model="queryParam.timeStr" placeholder="HH:mm"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click.prevent="getQuery">查询</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="warning" @click="refresh">强制更新</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click="supplementRefresh">补充更新</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="warning" @click="timeRefresh">强制更新时间点</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="warning" @click="filterDate">过滤数据</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="danger" @click="redisRefresh">快速刷新redis数据</el-button>
    </el-form-item>
    <el-form-item >
      <el-button type="danger" @click="testRedisData">测试redis数据</el-button>
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
      objectSign:  ConfigInfo.emotionInfo.defaultMinuterObjectSign ,
      timeInterval: ConfigInfo.emotionInfo.defaultTimeInterval,
    })

    const objectSignList = ref([])

    watch( ()=> queryParam.objectSign,(newValue,oldValue)=>{
      if(newValue!=null){
        getQuery();
      }
    },{immediate:true,deep:true})

    function refresh() {
      context.emit('refresh', queryParam)

    }

    function supplementRefresh() {
      context.emit('supplement-refresh', queryParam)
    }

    function timeRefresh() {
      context.emit('time-refresh', queryParam)
    }

    function filterDate() {
      context.emit('filter-date', queryParam)
    }
    function redisRefresh(){
      context.emit('redis-refresh', queryParam)
    }
    function testRedisData(){
      context.emit('test-redis-data', queryParam)
    }
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

    function  getInitObjectSign(){
      axios.post(AxiosUrl.stock.staticTemplate.findAll,{
        staticLatitude:1,
      }).then((res) => {
        res.forEach(v => {
          let objectEnumSignTemp = {
            label: v.remark,
            value: v.objectEnumSign,
          }
          objectSignList.value.push(objectEnumSignTemp);
        })
      });
    }

    onMounted(() => {
      getInitObjectSign();
    })

    return {
      getQuery,
      reset,
      dateChange,
      queryParam,
      refresh,
      supplementRefresh,
      timeRefresh,
      filterDate,
      redisRefresh,
      testRedisData,
      objectSignList
    }
  }
}
</script>

<style scoped>

</style>
