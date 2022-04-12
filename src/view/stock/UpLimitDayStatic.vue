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
              trigger='hover'
              class="box-item"
              effect="dark"
              :content="getDescribe(name)"
              raw-content
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
  name: "UpLimitStatic",
  props: {
    dateStr: {
      default: ConfigInfo.nowDate
    }
  },
  setup(props, context) {
    const upLimitList = ref([])
    const describeArr = ref([])

    const upDescriptList = ref([])


    function getDescribe(name) {
      let find = upDescriptList.value.data.find(item => item.股票简称 == name);
      if (find) {
        return '<span>'+ (find.涨停强弱概览.replaceAll('\n','<br>'))+'</span>';
      } else {
        return '';
      }
    }

    function getUpLimitInfo() {
      upLimitList.value.length=0
      axios.post(AxiosUrl.stock.specialStrategy.getUpLimitInfo, {
        dateStr: props.dateStr
      }).then((res) => {
        upLimitList.value = res;
      });

      upDescriptList.value.length = 0
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId: '1491466098237898752',
        dateStr: props.dateStr
      }).then((res) => {
        upDescriptList.value = res;
      });
    }

    onMounted(() => {
      getUpLimitInfo();
    })
    return {
      upLimitList, getDescribe,describeArr,upDescriptList
    }
  }
}
</script>

<style>

</style>
