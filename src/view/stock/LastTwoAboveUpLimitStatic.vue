<template>
  <div v-for="item of upLimitList">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class=" bg-purple"/>
        <el-button type="success" plain><span :style="getHoverStyle(item.upLimitNum)">{{ item.upLimitNum }}</span> </el-button>
      </el-col>
      <el-col :span="18">
        <div class=" bg-purple"/>
        <el-tag v-for="name of item.nameList" class="ml-2" type="warning">
          <el-tooltip
              trigger='hover'
              class="box-item"
              disabled="tooltipDisable"
              effect="dark"
              :content="getDescribe(name)"
              raw-content
              placement="top"
          >
            <span :style="getHoverStyle(name)"> {{ name }}</span>
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
  name: "LastTwoAboveUpLimitStatic",
  props: {
    dateStr: {
      type: String,
    },
    tooltipDisable: {
      default: function () {
        return false;
      }
    },
    themeStockArr: {
      type: Array,
      default:function (){
        return [];
      }
    },
    upLimitList: {
      type: Array,
      default:function (){
        return [];
      }
    },
    describeArr: {
      type: Array,
      default:function (){
        return [];
      }
    }
  },
  setup(props, context) {


    function getDescribe(nameTemp) {
      if (props.describeArr.length == 0) {
        return null;
      }
      let find = props.describeArr.find(item => item.name == nameTemp);
      if (find) {
        return '<span>' + (find.describe.replaceAll('\n', '<br>')) + '</span>';
      } else {
        return null;
      }
    }

    function getHoverStyle(name) {
      let defaultStyle = {margin: '5px', fontSize: '20px',}
      if (props.themeStockArr.length > 0) {
        let find = props.themeStockArr.find(item => item.name == name);
        if (find) {
          return Object.assign(defaultStyle,{backgroundColor: 'rgb(239,5,25)'});
        }
      }
      return defaultStyle;

    }

    onMounted(() => {
    })
    return {
      getDescribe, getHoverStyle
    }
  }
}
</script>

<style>

</style>
