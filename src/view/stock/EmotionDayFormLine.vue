<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">

    <el-form-item label="日期区间">
      <el-date-picker
          v-model="queryParam.dateRangeArray"
          type="daterange"
          value-format="YYYY-MM-DD"
          start-placeholder="Start Date"
          end-placeholder="End Date"
      >
      </el-date-picker>
    </el-form-item >
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
    <el-form-item  v-show="showInfo.baseButton">
      <el-button type="primary" @click.prevent="getIntervalStatic">查询</el-button>
    </el-form-item>
    <el-form-item  v-show="showInfo.baseButton">
      <el-button type="primary" @click.prevent="reset">重置</el-button>
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
import ConfigInfo from '/src/constant/ConfigInfo'
import {onMounted, reactive, ref} from "vue";
import AxiosUrl from "@/constant/AxiosUrl";
import axios from "axios";

export default {
  name: "EmotionDayFormLine.vue",
  props:{
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
    isShowObjectSign:{
      type:Boolean,
      default:false
    },
    showRefreshDate:{
      type:Boolean,
      default:false
    }
  },
  setup(props, context) {
    const queryParam = reactive({
      dateRangeArray: ConfigInfo.dateUtil.rangeDateArray,
      // objectSign: ConfigInfo.emotionInfo.defaultDayObjectSign,
    })

    function getIntervalStatic() {
      context.emit('query', queryParam)
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }

    function supplementRefresh(){
      context.emit('supplement-refresh',queryParam)
    }

    function refresh(){
      context.emit('refresh',queryParam)

    }
    const objectSignList = ref([])

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
      getIntervalStatic, reset, queryParam, supplementRefresh,refresh,objectSignList
    }
  }
}
</script>

<style scoped>

</style>
