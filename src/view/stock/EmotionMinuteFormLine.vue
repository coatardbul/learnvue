<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item v-show="showInfo.tradeButton">
      <el-button type="primary" @click="lastDay">上一交易日</el-button>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item v-show="showInfo.tradeButton">
      <el-button type="primary" @click="afterDay">下一交易日</el-button>
    </el-form-item>
    <el-form-item label="对象标识" v-show="showInfo.objectSign">
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
    <el-form-item label="时间间隔" v-show="showInfo.timeInterval">
      <el-input v-model="queryParam.timeInterval" type="number" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="时间" v-show="showInfo.timeStr">
      <el-input v-model="queryParam.timeStr" placeholder="HH:mm"></el-input>
    </el-form-item>
    <el-form-item label="题材" v-show="showInfo.themeStr">
      <el-input v-model="queryParam.themeStr" placeholder="题材"></el-input>
    </el-form-item>
    <el-form-item label="模板标识" v-show="showInfo.templateSign">
      <el-input v-model="queryParam.templateSign" placeholder="模板标识"></el-input>
    </el-form-item>
    <el-form-item v-show="showInfo.baseButton">
      <el-button type="primary" @click.prevent="getIntervalStatic">查询</el-button>
    </el-form-item>
    <el-form-item v-show="showInfo.baseButton">
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
    <el-form-item v-show="showInfo.forceRefreshButton">
      <el-button type="warning" @click="refresh">{{ showInfo.forceRefreshName }}</el-button>
    </el-form-item>
    <el-form-item v-show="showInfo.supplementRefreshButton">
      <el-button type="warning" @click="supplementRefresh">{{ showInfo.supplementRefreshName }}</el-button>
    </el-form-item>
    <el-form-item v-show="showInfo.refreshTimeButton">
      <el-button type="warning" @click="timeRefresh">{{ showInfo.timeRefreshName }}</el-button>
    </el-form-item>
    <el-form-item v-show="showInfo.filterDateButton">
      <el-button type="warning" @click="filterDate">{{ showInfo.filterDateName }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";
import ConfigInfo from '/src/constant/ConfigInfo'
import {onMounted, reactive, ref, watch} from "vue";
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
          objectSign: false,
          timeInterval: false,
          timeStr: false,
          themeStr:false,
          templateSign:false,
          forceRefreshName: '强制刷新',
          supplementRefreshButton: false,
          supplementRefreshName: '补充刷新',
          refreshTimeButton: false,
          timeRefreshName: "强制更新时间点",
          filterDateButton: false,
          filterDateName: "过滤数据",
        }
      }
    },

  },
  setup(props, context) {
    const queryParam = reactive({
      dateStr: ConfigInfo.nowDate,
      objectSign:  ConfigInfo.emotionInfo.defaultDayObjectSign ,
      timeInterval: ConfigInfo.emotionInfo.defaultTimeInterval,
    })

    const objectSignList = ref([])

    function lastDay() {

      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((res) => {
        queryParam.dateStr = res
        getIntervalStatic();

      });
    }

    watch( ()=> queryParam.objectSign,(newValue,oldValue)=>{
      if(newValue!=null){
        getIntervalStatic();
      }
    },{immediate:true,deep:true})

    function afterDay() {

      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: 1
      }).then((res) => {
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

    function timeRefresh() {
      context.emit('time-refresh', queryParam)
    }

    function filterDate() {
      context.emit('filter-date', queryParam)
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
    onMounted(() => {
      axios.post(AxiosUrl.stock.staticTemplate.findAll,{
        staticLatitude:2,
      }).then((res) => {
        res.forEach(v => {
          let objectEnumSignTemp = {
            label: v.remark,
            value: v.objectEnumSign,
          }
          objectSignList.value.push(objectEnumSignTemp);
        })
      });
    })

    return {
      getIntervalStatic,
      reset,
      queryParam,
      lastDay,
      afterDay,
      refresh,
      supplementRefresh,
      timeRefresh,
      filterDate,
      objectSignList
    }
  }
}
</script>

<style scoped>

</style>
