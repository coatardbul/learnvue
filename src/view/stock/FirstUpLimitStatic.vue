<template>
  <div v-for="item of upLimitList">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class=" bg-purple"/>
        <el-button type="success" plain>{{ item.themeName }}</el-button>
      </el-col>
      <el-col :span="18">
        <div class=" bg-purple"/>
        <el-tag v-for="nameIndex of item.nameList" class="ml-2" type="warning">
          <el-tooltip
              trigger='hover'
              class="box-item"
              effect="dark"
              :content="getDescribe(nameIndex.name)"
              raw-content
              placement="top"
          >
            {{ nameIndex.name }}
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

    const upDescriptList = ref([])

    function getUpLimitInfo() {
      upLimitList.value.length = 0
      upDescriptList.value.length = 0
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId: '1491466098237898752',
        dateStr: props.dateStr
      }).then((res) => {
        upDescriptList.value = res;
      });
      axios.post(AxiosUrl.stock.specialStrategy.getUpLimitTheme, {
        riverStockTemplateId: '1491466098237898752',
        dateStr: props.dateStr
      }).then((res) => {
        upLimitList.value = res;
      });

    }

    function getDescribe(name) {
      let find = upDescriptList.value.data.find(item => item.股票简称 == name);
      if (find) {
        return '<span>'+ (find.涨停强弱概览.replaceAll('\n','<br>'))+'</span>';
      } else {
        return '';
      }
    }

    onMounted(() => {
      getUpLimitInfo();
    })
    return {
      upLimitList, getDescribe, upDescriptList
    }
  }
}
</script>

<style>

</style>
