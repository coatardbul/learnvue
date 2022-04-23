<template>
  <TemplatedQueryFormLine ref="queryRef"
                          @query="getAllStockQuery"
                          @query-detail-list="getAllStockInfo">
  </TemplatedQueryFormLine>
  <div v-show="showInfo.tableIsShow">
    <el-button type="text" @click.prevent="addOptionalStock" round>+自选</el-button>
    <DialogDetail ref="plateSelectArr" @click-confirm="clickConfirm"></DialogDetail>
    <el-button type="text" @click.prevent="addVolPrice" round>+量价时空</el-button>


    <TemplateQueryTable :query-param="queryRef.queryParam"
                        :key="time"
                        :select-status="true"
                        @selection-change="selectionChange"
    >
    </TemplateQueryTable>
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
import DialogDetail from '@/view/stock/templatedQuery/DialogDetail'
import TemplateQueryTable from '@/view/stock/UpLimitTemplateQueryTable'

const queryRef = ref({})
const getMsg = ref('')
const tableData = ref([])
const tableProp = reactive([])
const showInfo = reactive({
  tableIsShow: false,
  linkIsShow: false,
})
const mulitSelectArr = ref([])
const templateList = ref([])
const plateSelectArr = ref()
const time = ref()


onMounted(() => {
  if (router.currentRoute.value.query.erb) {
    queryRef.value.queryParam.id = router.currentRoute.value.query.erb.split(',')
  }
  if (router.currentRoute.value.query.dateStr) {
    queryRef.value.queryParam.dateStr = router.currentRoute.value.query.dateStr
  }
  axios.post(AxiosUrl.river.stockTemplate.getList, {}).then((res) => {
    templateList.value.length = 0
    res.forEach(templateInfo => {
      let templateTemp = {
        label: templateInfo.name,
        value: templateInfo.id,
      }
      templateList.value.push(templateTemp);
    })
  });
})


function clickConfirm() {
  if (mulitSelectArr.value.length > 0 && plateSelectArr.value.mulPlateArr.length > 0) {
    let selectStockInfoArr = []
    mulitSelectArr.value.forEach(stockItem => {
      let stockInfo = {
        code: stockItem['code'],
        name: stockItem['股票简称'],
      }
      selectStockInfoArr.push(stockInfo);
    })

    axios.post(AxiosUrl.stock.stockOptionalPool.addPlateStock, {
      stockOptionalPlate:plateSelectArr.value.mulPlateArr[0],
      stockOptionalPoolList:selectStockInfoArr,
    }).then((res) => {
    });
  }

}

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


function addVolPrice() {
  if (mulitSelectArr.value.length > 0) {
    mulitSelectArr.value.forEach(item => {
      axios.post(AxiosUrl.stock.stockValPrice.execute, {
        code: item.code,
        dateStr: queryRef.value.queryParam.dateStr,
      }).then((res) => {
        getMsg.value = res
      });
    })
  }
}


function getAllStockQuery() {
  showInfo.tableIsShow = false
  showInfo.linkIsShow = true
  if (queryRef.value.queryParam.id == null || queryRef.value.queryParam.id.length == 0) {
    queryRef.value.queryParam.id = '1481302460344696832'
  }
  axios.post(AxiosUrl.river.stockTemplate.getQuery, {
    id: queryRef.value.queryParam.id.join(),
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
  time.value=new Date().getTime();
}




</script>
