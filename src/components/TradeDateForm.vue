<template>
  <el-form-item>
    <el-button type="primary" @click="lastDay">上一交易日</el-button>
  </el-form-item>
  <el-form-item label="日期">
    <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="afterDay">下一交易日</el-button>
  </el-form-item>
</template>

<script>
import {onMounted, reactive, ref, watch} from "vue";
import AxiosUrl from "@/constant/AxiosUrl";
import axios from "axios";

export default {
  name: "TradeDateForm.vue",
  props: {
    dateStr: {
      type: String,
    }
  },
  setup(props, context) {

    const queryParam = reactive({
      dateStr: props.dateStr,
    })
    watch( ()=> queryParam.dateStr,(newValue,oldValue)=>{
      if(newValue!=null){
        context.emit('date-change',newValue);
      }
    },{immediate:true,deep:true})

    function lastDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((res) => {
        queryParam.dateStr = res
        context.emit('date-change',res);
      });
    }

    function afterDay() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: queryParam.dateStr,
        dateProp: 1,
        addDay: 1
      }).then((res) => {
        queryParam.dateStr = res
        context.emit('date-change',res);
      });
    }
    onMounted(() => {
    })
    return {
      queryParam,
      lastDay,
      afterDay,
    }
  }
}
</script>

<style scoped>

</style>
