<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item>
      <el-button type="primary" @click="lastDay" v-show="isShow">上一交易日</el-button>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="afterDay" v-show="isShow">下一交易日</el-button>
    </el-form-item>
    <el-form-item label="对象标识">
      <el-input v-model="queryParam.objectSign"></el-input>
    </el-form-item>
    <el-form-item label="时间间隔">
      <el-input v-model="queryParam.timeInterval" type="number" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="getIntervalStatic">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="refresh"   v-show="isShow">强制刷新</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="supplementRefresh"   v-show="isShow">补充刷新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";
import ConfigInfo from '/src/constant/ConfigInfo'
import {reactive} from "vue";
import AxiosUrl from "@/constant/AxiosUrl";
import axios from "axios";

export default {
  name: "EmotionMinuteFormLine.vue",
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const queryParam = reactive({
      dateStr: ConfigInfo.nowDate,
      objectSign: ConfigInfo.emotionInfo.defaultMinuterObjectSign,
      timeInterval: ConfigInfo.emotionInfo.defaultTimeInterval,
    })

    function lastDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((res)=>{
        queryParam.dateStr = res
        getIntervalStatic();

      });
    }

    function afterDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: 1
      }).then((res)=>{
        queryParam.dateStr = res
        getIntervalStatic();
      });
    }

    function refresh() {
      context.emit('refresh-minuter-emotion', queryParam)

    }
    function supplementRefresh() {
      context.emit('supplement-refresh-minuter-emotion', queryParam)

    }


    function getIntervalStatic() {
      context.emit('query-minuter-emotion', queryParam)
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }

    return {
      getIntervalStatic, reset, queryParam, lastDay, afterDay,refresh,supplementRefresh
    }
  }
}
</script>

<style scoped>

</style>
