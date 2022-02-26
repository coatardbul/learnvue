<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item v-show="showInfo.tradeButton">
      <el-button type="primary" @click="lastDay" >上一交易日</el-button>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item  v-show="showInfo.tradeButton">
      <el-button type="primary" @click="afterDay" >下一交易日</el-button>
    </el-form-item>
    <el-form-item label="对象标识"  v-show="showInfo.objectSign">
      <el-input v-model="queryParam.objectSign"></el-input>
    </el-form-item>
    <el-form-item label="时间间隔"  v-show="showInfo.timeInterval">
      <el-input v-model="queryParam.timeInterval" type="number" placeholder=""></el-input>
    </el-form-item  >
    <el-form-item v-show="showInfo.baseButton">
      <el-button type="primary" @click.prevent="getIntervalStatic">查询</el-button>
    </el-form-item>
    <el-form-item v-show="showInfo.baseButton">
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item   v-show="showInfo.forceRefreshButton">
      <el-button type="primary" @click="refresh"  >{{showInfo.forceRefreshName}}</el-button>
    </el-form-item>
    <el-form-item  v-show="showInfo.supplementRefreshButton">
      <el-button type="primary" @click="supplementRefresh"  >{{showInfo.supplementRefreshName}}</el-button>
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
    showInfo: {
      type: Object,
      default: function () {
        return {
          tradeButton: true,
          baseButton: true,
          forceRefreshButton: false,
          objectSign:false,
          timeInterval:false,
          forceRefreshName: '强制刷新',
          supplementRefreshButton:false,
          supplementRefreshName:'补充刷新',
        }
      }
    },

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
      context.emit('refresh', queryParam)

    }
    function supplementRefresh() {
      context.emit('supplement-refresh', queryParam)

    }


    function getIntervalStatic() {
      context.emit('query', queryParam)
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
