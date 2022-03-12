<template>
  <TemplatedQueryFormLine ref="queryRef"
                          @query="getAllStockQuery"
                          @query-detail-list="getAllStockInfo">

  </TemplatedQueryFormLine>
  <div v-show="showInfo.tableIsShow">
    <el-button type="text" @click.prevent="addOptionalStock" round>+自选</el-button>
    <el-table :data="tableData"
              border
              highlight-current-row
              fit="true"
              @selection-change="selectionChange"
    >
      <el-table-column type="index" fixed width="50"/>
      <el-table-column type="selection" fixed width="55"/>
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
          width="180"
      />
    </el-table>
  </div>

  <el-link :href="'http://www.iwencai.com/unifiedwap/result?w='+getMsg+'&querytype=stock'" v-show="showInfo.linkIsShow"
           target="_blank">
    {{ getMsg }}
  </el-link>
</template>
<script setup>
import axios from 'axios';
import {reactive, onMounted, ref} from 'vue'
import router from "@/config/router";
import TemplatedQueryFormLine from './TemplatedQueryFormLine'
import AxiosUrl from '/src/constant/AxiosUrl'

const queryRef = ref({})
const getMsg = ref('')
const tableData = ref([])
const tableProp = reactive([])
const showInfo = reactive({
  tableIsShow: false,
  linkIsShow: false,
})
const mulitSelectArr = ref([])
onMounted(() => {
  queryRef.value.queryParam.id = router.currentRoute.value.query.erb
  // input.value=this.$router.query.erb==null?'':this.$router.query.erb
})

function selectionChange(val) {
  mulitSelectArr.value = val;
}

function addOptionalStock() {
  if (mulitSelectArr.value.length > 0) {
    mulitSelectArr.value.forEach(item => {
      axios.post(AxiosUrl.stock.stockOptionalPool.add, {
        code: item.code,
        name: item.股票简称,
        type: 2,
      }).then((res) => {
        getMsg.value = res
      });
    })
  }

}

function formatter(row, column, cellValue, index) {
  if (column.property.indexOf('市值') != -1) {
    return forMatterMoneyNum(cellValue);
  } else if (column.property.indexOf('金额') != -1&&column.property.indexOf('{/}') == -1) {
    return forMatterMoneyNum(cellValue);
  } else if (column.property.indexOf('封单额') != -1) {
    return forMatterMoneyNum(cellValue);
  }else if (column.property.indexOf('封单量') != -1&&column.property.indexOf('占') == -1) {
    return (Number(cellValue)/100/10000).toFixed(2)+'万';
  }else if (column.property.indexOf('换手') != -1) {
    return Number(cellValue).toFixed(2)+'%';
  }else if (column.property.indexOf('涨幅') != -1 || column.property.indexOf('涨跌幅') != -1) {
    return Number(cellValue).toFixed(2)+'%';
  }  else {
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

function getAllStockQuery() {
  showInfo.tableIsShow = false
  showInfo.linkIsShow = true
  if (queryRef.value.queryParam.id == null || queryRef.value.queryParam.id == 0) {
    queryRef.value.queryParam.id = '1481302460344696832'
  }
  axios.post(AxiosUrl.river.stockTemplate.getQuery, {
    id: queryRef.value.queryParam.id,
    dateStr: queryRef.value.queryParam.dateStr,
    timeStr: queryRef.value.queryParam.timeStr,
    stockCode: queryRef.value.queryParam.stockCode,
  }).then((res) => {
    getMsg.value = res
  });
}

function getAllStockInfo() {
  showInfo.tableIsShow = true
  showInfo.linkIsShow = false
  tableData.value.length = 0;
  tableProp.length = 0;
  if (queryRef.value.queryParam.id == null || queryRef.value.queryParam.id == 0) {
    queryRef.value.queryParam.id = '1481302460344696832'
  }
  axios.post(AxiosUrl.stock.stockQuery.strategy, {
    riverStockTemplateId: queryRef.value.queryParam.id,
    dateStr: queryRef.value.queryParam.dateStr,
    timeStr: queryRef.value.queryParam.timeStr,
    stockCode: queryRef.value.queryParam.stockCode,
  }).then((res) => {
    if (res.data) {
      let datum = res.data[0];
      let keyArr = []
      Object.keys(datum).forEach(key => {
        keyArr.push(key)
      })
      sortArr(keyArr, 'code','market_code');
      sortArr(keyArr, '股票简称');
      sortArr(keyArr, '竞价涨幅');
      sortArr(keyArr, '竞价金额','{/}');
      sortArr(keyArr, '{/}');
      sortArr(keyArr, '涨幅');
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
        tableProp.push(propInfo);
      })


      tableData.value = res.data
    }
  });
}

function sortArr(keyArr, keyName,notKeyName) {
  while (true) {
    let index;
    if(notKeyName){
       index = keyArr.findIndex(key => key.indexOf(keyName) != -1  && key.indexOf(notKeyName) == -1)
    }else {
       index = keyArr.findIndex(key => key.indexOf(keyName) != -1)
    }
    if (index > 0) {
      let propInfo = {
        prop: keyArr[index],
        label: keyArr[index],
      }
      tableProp.push(propInfo);
      keyArr.splice(index, 1);
    } else {
      break;
    }

  }

}

</script>
