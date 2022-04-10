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
        sortable
        :key="item"
        show-overflow-tooltip
        :formatter="formatter"
        v-for="item  in tableProp"
        align="center"
        :sort-method="(a,b) => sortColumn(a ,b , item.prop)"
        :prop="item.prop"
        :label="item.label"
        :width="item.prop=='code' || item.prop.indexOf('股票简称')!=-1?90:180"
    />
  </el-table>

</template>

<script >
import axios from 'axios';
import {reactive, onMounted, ref} from 'vue'
import AxiosUrl from '/src/constant/AxiosUrl'

export default {
  name: "TemplateQueryTable.vue",
  props: {
    queryParam: {
      default: Object
    }
  },
  setup(props, context) {
    const tableData = ref([])
    const tableProp = ref([])

    onMounted(() => {
      getAllStockInfo();
    })


    function formatter(row, column, cellValue, index) {
      if (column.property.indexOf('市值') != -1) {
        return forMatterMoneyNum(cellValue);
      } else if (column.property.indexOf('金额') != -1 && column.property.indexOf('{/}') == -1) {
        return forMatterMoneyNum(cellValue);
      }else if (column.property.indexOf('成交额') != -1 ) {
        return forMatterMoneyNum(cellValue);
      } else if (column.property.indexOf('封单额') != -1) {
        return forMatterMoneyNum(cellValue);
      } else if (column.property.indexOf('封单量') != -1 && column.property.indexOf('占') == -1) {
        return (Number(cellValue) / 100 / 10000).toFixed(2) + '万';
      } else if (column.property.indexOf('换手') != -1) {
        return Number(cellValue).toFixed(2) + '%';
      } else if (column.property.indexOf('涨幅') != -1 || column.property.indexOf('涨跌幅') != -1) {
        return Number(cellValue).toFixed(2) + '%';
      } else {
        return cellValue;
      }
    }


    function forMatterMoneyNum(cellValue) {
      if (Number(cellValue) / 10000 / 10000 > 1) {
        return (Number(cellValue) / 10000 / 10000).toFixed(2) + '亿';
      } else {
        return (Number(cellValue) / 10000).toFixed(2) + '千万';
      }
    }


    function sortColumn(a, b, prop) {
      let aNum = Number(a[prop]);
      let bNum = Number(b[prop]);
      if (!isNaN(aNum)) {
        return aNum - bNum;
      } else {
        let reg = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
        // let aIsMatch = a[prop].match(reg);
        if (reg.test(a[prop].trim())) {
          let atemp = a[prop].trim().replaceAll(":", "");
          let btemp = b[prop].trim().replaceAll(":", "");
          return Number(atemp) - Number(btemp);
        }
        return a[prop] - b[prop];
      }
    }

    function getAllStockInfo() {
      tableData.value.length = 0;
      tableProp.value.length = 0;
      axios.post(AxiosUrl.stock.stockQuery.strategy, {
        riverStockTemplateId:props.queryParam.id == null || props.queryParam.id == 0? '1481302460344696832':props.queryParam.id,
        dateStr: props.queryParam.dateStr,
        timeStr: props.queryParam.timeStr,
        stockCode: props.queryParam.stockCode,
      }).then((res) => {
        if (res.data) {
          let datum = res.data[0];
          let keyArr = []
          Object.keys(datum).forEach(key => {
            keyArr.push(key)
          })
          sortArr(keyArr, 'code', 'market_code');
          sortArr(keyArr, '股票简称');
          sortArr(keyArr, '竞价涨幅');
          sortArr(keyArr, '竞价金额', '{*}');
          sortArr(keyArr, '竞价金额', '{/}');
          sortArr(keyArr, '{/}');
          sortArr(keyArr, '涨幅');
          sortArr(keyArr, '成交额');
          sortArr(keyArr, '涨跌幅');
          sortArr(keyArr, '换手率');
          sortArr(keyArr, '市值');
          sortArr(keyArr, '振幅');
          sortArr(keyArr, '时间');
          sortArr(keyArr, '封单额');
          sortArr(keyArr, '封单量');

          keyArr.forEach(key => {
            let propInfo = {
              prop: key,
              label: key,
            }
            tableProp.value.push(propInfo);
          })


          tableData.value = res.data
        }
      });
    }

    function sortArr(keyArr, keyName, notKeyName) {
      while (true) {
        let index;
        if (notKeyName) {
          index = keyArr.findIndex(key => key.indexOf(keyName) != -1 && key.indexOf(notKeyName) == -1)
        } else {
          index = keyArr.findIndex(key => key.indexOf(keyName) != -1)
        }
        if (index > 0) {
          let propInfo = {
            prop: keyArr[index],
            label: keyArr[index],
          }
          tableProp.value.push(propInfo);
          keyArr.splice(index, 1);
        } else {
          break;
        }

      }

    }

    return {
      getAllStockInfo,sortColumn,formatter,tableData,tableProp
    }
  }
}

</script>

<style scoped>

</style>
