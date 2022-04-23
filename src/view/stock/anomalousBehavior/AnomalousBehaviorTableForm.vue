<template>
  <el-button type="text" @click.prevent="batchDelete" round>删除</el-button>
  <el-button type="text" @click.prevent="updateDate" round>更新数据</el-button>
  <el-table :data="tableData"
            empty-text="无"
            border
            highlight-current-row
            fit="true"
            @selection-change="selectionChange"
  >
    <el-table-column type="index" fixed width="50"/>
    <el-table-column type="selection" fixed width="55"/>
    <el-table-column
        :fixed="item.prop=='code' || item.prop.indexOf('股票简称')!=-1"
        :key="item"
        show-overflow-tooltip
        v-for="item  in tableProp"
        align="center"
        :prop="item.prop"
        :label="item.label"
        :width="item.prop=='code' || item.prop.indexOf('股票简称')!=-1?90:110"
    >

      <template v-slot="scope">
        <el-tooltip
            trigger='hover'
            class="box-item"
            effect="dark"
            :content="getDescribe(scope.row['code'],item.prop)"
            raw-content
            placement="top"
        >
          <span :style="getTableStype(item.prop,scope.row[item.prop])">{{ scope.row[item.prop] }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
import {ref} from "vue";

export default {
  name: "AnomalousBehaviorTableForm.vue",
  props:{
    tableProp:{
      type: Object,
    },
    tableData:{
      type: Object,
    },
    tableDescribe:{
      type: Object,
    },
  },
  setup(props, context) {
    const mulitSelectArr = ref([])

    function getTableStype(itemProp, tableColumnInfo) {

      if (tableColumnInfo == '涨停') {
        return {color: '#f5071b'}
      }
      if (tableColumnInfo && tableColumnInfo.indexOf('涨幅') >= 0) {
        return {color: '#a23c45'}
      }
      if (tableColumnInfo == '曾涨停') {
        return {color: '#b63f13', backgroundColor: 'yellow'}
      }
      if (tableColumnInfo == '跌停') {
        return {color: '#18bd18'}
      }
      if (tableColumnInfo && tableColumnInfo.indexOf('跌幅') >= 0) {
        return {color: '#4e8d4e'}
      }
      if (tableColumnInfo == '曾跌停') {
        return {color: '#4d9b6f', backgroundColor: '#e3b726'}
      }
      return null;

    }

    function batchDelete(){
      context.emit('batch-delete',mulitSelectArr);
    }
    function updateDate(){
      context.emit('update-date');

    }
    function getDescribe(code, propName) {
      let sb = props.tableDescribe;
      if (sb.has(code)) {
        let newVar = sb.get(code);
        if (newVar.has(propName)) {
          return '<span>' + (newVar.get(propName).replaceAll('\n', '<br>')) + '</span>';
        }
      }
      return null;
    }
    function selectionChange(val) {
      mulitSelectArr.value = val;
    }

    return{
      getTableStype,getDescribe,selectionChange,mulitSelectArr,batchDelete,updateDate
    }

  }
}
</script>

<style scoped>

</style>
