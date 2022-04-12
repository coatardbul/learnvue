<template>
  <el-table :data="tableData"
            empty-text="无"
            border
            highlight-current-row
            fit="true"
  >
    <el-table-column type="index" fixed width="50"/>
    <el-table-column
        :fixed="item.prop=='code' || item.prop.indexOf('股票简称')!=-1"
        :key="item"
        show-overflow-tooltip
        :formatter="formatter"
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
          <span>{{ scope.row[item.prop] }}</span>
<!--          <span>{{ JSON.stringify(scope.row) }}</span>-->
<!--          <span>{{ scope.row['code'] }}</span>-->

        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
import {reactive, onMounted, ref} from 'vue'
import AxiosUrl from '/src/constant/AxiosUrl'

export default {
  name: "UpLimitDescribeTable.vue",
  props: {
    queryParam: {
      default: Object
    }
  },
  setup(props, context) {
    const tableData = ref([])
    const tableProp = ref([])
    const tableDescribe = ref({})

    onMounted(() => {
      getAllStockInfo();
    })


    function getDescribe(code, propName) {
      let sb = tableDescribe.value;
      if (sb.has(code)) {
        let newVar = sb.get(code);
        if (newVar.has(propName)) {
          return '<span>'+ (newVar.get(propName).replaceAll('\n','<br>'))+'</span>';
        }
      }
      return null;
    }


    function getAllStockInfo() {
      axios.post(AxiosUrl.river.calendar.getSpecialDay, {
        dateStr: props.queryParam.dateStr,
        dateProp: 1,
        addDay: -15
      }).then((res) => {
        axios.post(AxiosUrl.river.calendar.getDate, {
          beginDate: res,
          endDate: props.queryParam.dateStr,
          dateProp: 1,
        }).then((dateStrList) => {
          getOnceUpLimitData(dateStrList);
        });

      });
    }

    function getOnceUpLimitData(dateStrList) {
      tableData.value.length = 0;
      tableProp.value.length = 0;
      tableDescribe.value = {}
      let codeIndex = {
        prop: 'code',
        label: 'code',
      }
      tableProp.value.push(codeIndex);
      let nameIndex = {
        prop: '股票简称',
        label: '股票简称',
      }
      tableProp.value.push(nameIndex);
      dateStrList.forEach(key => {
        let propInfo = {
          prop: key,
          label: key,
        }
        tableProp.value.push(propInfo);
      })
      axios.post(AxiosUrl.stock.specialStrategy.getOnceUpLimitData, {
        riverStockTemplateId: props.queryParam.id == null || props.queryParam.id == 0 ? '1501584345410961408' : props.queryParam.id,
        dateStr: props.queryParam.dateStr,
      }).then((res) => {
        let codeMap = new Map();
        res.forEach(item => {
          if (codeMap.has(item.code)) {
            let newVar = codeMap.get(item.code);
            newVar.push(item);
            codeMap.set(item.code, newVar);
          } else {
            let codeDateArr = []
            codeDateArr.push(item);
            codeMap.set(item.code, codeDateArr);
          }
        })

        let allDescribeMap = new Map();
        for (let [key, value] of codeMap.entries()) {
          let tableColumnIndex = {
            code: key,
            股票简称: value[0].name,
          };
          let describeMap = new Map()
          value.forEach(dateInfo => {
            let newTempObject = {}
            newTempObject[dateInfo.date] = dateInfo.upLimitType;
            describeMap.set(dateInfo.date, dateInfo.upLimitInfo)
            tableColumnIndex = Object.assign(tableColumnIndex, newTempObject);
          })
          allDescribeMap.set(key, describeMap);
          tableDescribe.value = allDescribeMap;
          tableData.value.push(tableColumnIndex);
        }

      });
    }


    return {
      getAllStockInfo, tableData, tableProp, tableDescribe,getDescribe
    }
  }
}

</script>

<style scoped>

</style>
