<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item>
      <el-select
          filterable
          v-model="queryParam.id"
          multiple
          placeholder="Select"
          style="width: 240px"
      >
        <el-option
            v-for="item in templateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
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

    <el-form-item>
      <el-button type="success" round @click="lastDay">←</el-button>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="success" round @click="afterDay">→</el-button>
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
    <el-form-item label="股票代码">
      <el-input v-model="queryParam.stockCode" placeholder="000000"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="query">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" round @click.prevent="buildDate">补充构造数据</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" round @click.prevent="forceBuildDate">重新构造数据</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ConfigInfo from '/src/constant/ConfigInfo'
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name: "AnomalousBehaviorQueryFormLine.vue",
  setup(props, context) {
    const queryParam = reactive({
      dateStr: ConfigInfo.nowDate,
    })
    const templateList = ref([])

    const  plateList=ref([])
    function query() {
      context.emit('query', queryParam)
    }

    function buildDate() {
      context.emit('build-date', queryParam)
    }
    function forceBuildDate() {
      context.emit('force-build-date', queryParam)
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
    function lastDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((res) => {
        queryParam.dateStr = res
        query();

      });
    }

    function afterDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: 1
      }).then((res) => {
        queryParam.dateStr = res
        query();
      });
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }

    onMounted(() => {
       getAllStockInfo() ;
      axios.post(AxiosUrl.river.stockTemplate.getList, {}).then((res) => {
        templateList.value.length = 0
        res.forEach(templateInfo => {
          let templateTemp = {
            label: templateInfo.name,
            value: templateInfo.id,
          }
          templateList.value.push(templateTemp);
        })
      });
    })
    return {
      query, reset, queryParam, buildDate, forceBuildDate,lastDay, afterDay, templateList,plateList
    }
  }
}
</script>

<style scoped>
.el-select .el-input__inner {
  vertical-align: bottom !important;
}
</style>
