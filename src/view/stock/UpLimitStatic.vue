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

     function getDescribe(nameTemp) {
      if(describeArr.value.length==0){
        return null;
      }
      let find = describeArr.value.find(item=>item.name==nameTemp);
      if(find){

        return '<span>'+ (find.describe.replaceAll('\n','<br>'))+'</span>';
      }else {
        return null;
      }
    }

    function getUpLimitInfo() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: props.dateStr,
        dateProp: 1,
        addDay: -1
      }).then((lastDay) => {
      upLimitList.value.length=0
      axios.post(AxiosUrl.stock.specialStrategy.getUpLimitInfo, {
        dateStr: lastDay
      }).then((res) => {
        upLimitList.value = res;
        res.forEach(item => {
          describeArr.value.length = 0;
          item.nameList.forEach(nameTemp => {
            axios.post(AxiosUrl.stock.stockValPrice.getDescribe, {
              name: nameTemp,
              dateStr: props.dateStr,
            }).then((resss) => {
              if (resss != null) {
                let sb = {
                  name: nameTemp,
                  describe: resss,
                }
                describeArr.value.push(sb);
              }
            });
          });
        })
      });
      });
    }

    onMounted(() => {
      getUpLimitInfo();
    })
    return {
      upLimitList, getDescribe,describeArr
    }
  }
}
</script>

<style>

</style>
