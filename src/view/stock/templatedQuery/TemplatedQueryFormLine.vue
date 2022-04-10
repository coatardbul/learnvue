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
    <el-form-item label="时间">
      <el-input v-model="queryParam.timeStr" placeholder="HH:mm"></el-input>
    </el-form-item>
    <el-form-item label="股票代码">
      <el-input v-model="queryParam.stockCode" placeholder="000000"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="query">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" round @click.prevent="queryDetailList">查询信息</el-button>
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
  name: "TemplatedQueryFormLine.vue",
  setup(props, context) {
    const queryParam = reactive({
      dateStr: ConfigInfo.nowDate,
    })
    const templateList = ref([])

    function query() {
      context.emit('query', queryParam)
    }

    function queryDetailList() {
      context.emit('query-detail-list', queryParam)

    }

    function lastDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((res) => {
        queryParam.dateStr = res
        queryDetailList();

      });
    }

    function afterDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: 1
      }).then((res) => {
        queryParam.dateStr = res
        queryDetailList();
      });
    }

    function reset() {
      //清空reactive引用的对象
      Object.keys(queryParam).map(key => {
        delete queryParam[key]
      })
    }

    onMounted(() => {
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
      query, reset, queryParam, queryDetailList, lastDay, afterDay, templateList
    }
  }
}
</script>

<style scoped>
.el-select .el-input__inner {
  vertical-align: bottom !important;
}
</style>
