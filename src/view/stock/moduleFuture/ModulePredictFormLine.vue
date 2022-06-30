<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item label="id">
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
    <el-form-item label="买入时间">
      <el-input v-model="queryParam.buyTime" placeholder="HH:mm"></el-input>
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
    </el-form-item>
    <el-form-item label="持股天数">
      <el-input v-model="queryParam.holeDay" type="number" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="卖出时间">
      <el-input v-model="queryParam.saleTime" placeholder="HH:mm"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="query">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="reset">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click.prevent="excute">执行</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click.prevent="deleteInfo">删除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ConfigInfo from '/src/constant/ConfigInfo'
import {onMounted, reactive,ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  name: "ModulePredictFormLine.vue",
  setup(props, context) {
    const queryParam = reactive({
      dateRangeArray: ConfigInfo.dateUtil.rangeDateArray,

    })
    const templateList = ref([])

    function query() {
      context.emit('query', queryParam)
    }

    function excute() {
      context.emit('excute', queryParam)
    }
    function deleteInfo() {
      context.emit('delete-info', queryParam)
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
      query, reset, queryParam, excute,templateList,deleteInfo
    }
  }
}
</script>

<style scoped>

</style>
