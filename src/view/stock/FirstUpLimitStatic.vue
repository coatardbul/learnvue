<template>
  <div v-for="item of upLimitList">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class=" bg-purple"/>
        <el-button type="success" plain>{{ item.upLimitNum }}</el-button>
      </el-col>
      <el-col :span="18">
        <div class=" bg-purple"/>
        <el-tag v-for="name of item.nameList" class="ml-2" type="warning">
          <el-tooltip
              class="box-item"
              effect="dark"
              placement="top"
          >
            {{ name }}
          </el-tooltip>
        </el-tag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import {onMounted, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";

export default {
  name: "FirstUpLimitStatic",
  props: {
    dateStr: {
      default: ConfigInfo.nowDate
    }
  },
  setup(props, context) {
    const upLimitList = ref([])
    function getUpLimitInfo() {
      upLimitList.value.length=0
      axios.post(AxiosUrl.stock.specialStrategy.getUpLimitTheme, {
        riverStockTemplateId:'1491466098237898752',
        dateStr: props.dateStr
      }).then((res) => {
        upLimitList.value = res;
      });
    }

    onMounted(() => {
      getUpLimitInfo();
    })
    return {
      upLimitList
    }
  }
}
</script>

<style>

</style>
