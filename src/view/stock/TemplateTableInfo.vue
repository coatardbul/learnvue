<template>
  <el-table :data="tableData"
            empty-text="无"
            border
            highlight-current-row
            fit="true"
            @selection-change="selectionChange"
  >
    <el-table-column type="index" align="center"
                     fixed width="50"/>
    <el-table-column type="selection" fixed width="55" v-if="selectStatus" />
    <el-table-column
        v-for="item  in tableProp"
        :key="item"
        :fixed="item.prop=='code' || item.prop.indexOf('股票简称')!=-1"
        sortable
        align="center"
        resizable
        :sort-method="(a,b) => sortColumn(a ,b , item.prop)"
        :prop="item.prop"
        :label="item.label"
        :min-width="getMinWidth(item)"
    >
      <template v-slot="scope">
        <el-tooltip
            trigger='hover'
            class="box-item"
            :disabled="disable(item,scope)"
            effect="dark"
            :content="getDescribe(item,scope)"
            raw-content
            placement="top"
        >
          <p :style="getStyleRate(item,scope)">{{
              formatter(item,scope)
            }}</p>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
import axios from 'axios';
import {reactive, onMounted, ref} from 'vue'
import AxiosUrl from '/src/constant/AxiosUrl'
import StockInfoUtil from '@/constant/StockInfoUtil'
export default {
  name: "TemplateTableInfo.vue",
  props: {
    selectStatus: {
      default: false
    },
    tableData:{
      type:Array,
    },
    tableProp:{
      type:Array,
    }
  },
  setup(props, context) {

    onMounted(() => {
    })

    function getDescribe(item, scope) {
      let propValue = scope.row[item.prop]
      let propName = item.prop;
      if (propName.indexOf("涨停强弱概览") > -1) {
        return '<span>' + (propValue.replaceAll('\n', '<br>')) + '</span>';
      }else if (propName.indexOf("涨停明细数据") > -1||propName.indexOf("所属概念") > -1||propName.indexOf("所属同花顺行业") > -1
      ||propName.indexOf("跌停明细数据") > -1||propName.indexOf("涨停原因类别") > -1 ||propName.indexOf("经营范围") > -1
      ) {
        return propValue;
      } else {
        return null;
      }
    }
    function disable(item,scope) {
      let propName = item.prop;
      if (propName.indexOf("所属概念") > -1||propName.indexOf("涨停强弱概览") > -1
          ||propName.indexOf("涨停明细数据") > -1||propName.indexOf("所属同花顺行业") > -1
          ||propName.indexOf("跌停明细数据") > -1 ||propName.indexOf("涨停原因类别") > -1
          ||propName.indexOf("经营范围") > -1
      ) {
        return false;
      } else {
        return true;
      }
    }
    function selectionChange(val) {
      context.emit('selection-change',val)
    }


    function getMinWidth(item){
      if( item.prop=='code' || item.prop.indexOf('股票简称')!=-1){
        return 90;
      }
      if(item.prop.indexOf('封单范围')!=-1){
        return 150;
      }
      if(item.prop.indexOf('金额')!=-1||item.prop.indexOf('封单额')!=-1||item.prop.indexOf('成交额')!=-1){
        return 130;
      }
      if(item.prop.indexOf('涨停强弱概览')!=-1){
        return 170;
      }
      return 100;
    }






    function getStyleRate(item, scope) {
      let rowValue = scope.row[item.prop]
      let itemProp = item.prop;
      let result = {
        width: scope.column.width+'px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign:'center',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
      }
      if (itemProp.indexOf("竞价涨幅") > -1 || itemProp.indexOf("涨幅") > -1 || itemProp.indexOf("涨跌幅") > -1) {
        return StockInfoUtil.increaseRateColor(rowValue);
      }
      if (itemProp.indexOf("{/}") > -1) {
        if (rowValue > 100) {
          return {color: '#f6061b'};
        }
        if (rowValue > 50) {
          return {color: '#cb1d2c'};
        }
        if (rowValue > 20) {
          return {color: '#8d3a42'};
        }
        if (rowValue < 0.5) {
          return {color: '#2cb42c'};
        }
      }

      return result;
    }


    function formatter(item,scope) {

      let column=item.prop;
      let cellValue=scope.row[item.prop];

      if (column.indexOf('市值') != -1) {
        return forMatterMoneyNum(cellValue);
      } else if (column.indexOf('金额') != -1 && column.indexOf('{/}') == -1) {
        return forMatterMoneyNum(cellValue);
      } else if (column.indexOf('封单额') != -1 || column.indexOf('成交额') != -1) {
        return forMatterMoneyNum(cellValue);
      } else if (column.indexOf('封单量') != -1 && column.indexOf('占') == -1) {
        return (Number(cellValue) / 100 / 10000).toFixed(2) + '万';
      } else if (column.indexOf('换手') != -1) {
        return Number(cellValue).toFixed(2) + '%';
      } else if (column.indexOf('涨幅') != -1 || column.indexOf('涨跌幅') != -1) {
        return Number(cellValue).toFixed(2) + '%';
      }  else if (column.indexOf('{/}') != -1) {
        return Number(cellValue).toFixed(2);
      } else if (column.indexOf('振幅') != -1) {
        return Number(cellValue).toFixed(2) + '%';
      }  else {
        return cellValue;
      }
    }


    function forMatterMoneyNum(cellValue) {
      return StockInfoUtil.forMatMoneyNum(cellValue);
    }


    function sortColumn(a, b, prop) {
      let aNum = Number(a[prop]);
      let bNum = Number(b[prop]);
      if (!isNaN(aNum)) {
        return aNum - bNum;
      } else {
        //hh:mm:ss 时间的正则表达式
        let timeReg = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
        // let aIsMatch = a[prop].match(timeReg);
        if (timeReg.test(a[prop].trim())) {
          let atemp = a[prop].trim().replaceAll(":", "");
          let btemp = b[prop].trim().replaceAll(":", "");
          return Number(atemp) - Number(btemp);
        }
       let numReg= /^\d+(\.\d+[万])$/;
        if (numReg.test(a[prop].trim())) {
          let atemp = a[prop].trim().replaceAll("万", "");
          let btemp = b[prop].trim().replaceAll("万", "");
          return Number(atemp) - Number(btemp);
        }
        return a[prop] - b[prop];
      }
    }




    return {
       sortColumn, formatter,  getStyleRate, getDescribe, disable,selectionChange,getMinWidth
    }
  }
}

</script>

<style scoped>

</style>
