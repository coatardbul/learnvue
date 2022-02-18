<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">

    <el-form-item label="日期区间">
      <el-date-picker
          v-model="queryParam.dateRangeArray"
          type="daterange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="对象标识">
      <el-input v-model="queryParam.objectSign"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="getIntervalStatic">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="refreshDate">刷新数据</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="forceRefreshDate">强制刷新数据</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ConfigInfo from '/src/constant/ConfigInfo'
import {reactive} from "vue";

export default {
  name: "EmotionDayFormLine.vue",
  props:{
    showRefreshDate:{
      type:Boolean,
      default:false
    }
  },
  setup(props, context) {
    const queryParam = reactive({
      dateRangeArray: ConfigInfo.dateUtil.rangeDateArray,
      objectSign: ConfigInfo.emotionInfo.defaultDayObjectSign,
    })

    function getIntervalStatic() {
      context.emit('query-day-emotion', queryParam)
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }

    function refreshDate(){
      context.emit('refresh-date',queryParam)
    }

    function forceRefreshDate(){
      context.emit('force-refresh-date',queryParam)

    }

    return {
      getIntervalStatic, reset, queryParam, refreshDate,forceRefreshDate
    }
  }
}
</script>

<style scoped>

</style>
