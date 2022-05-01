<template>
  <div>


    <el-affix :offset="30">
      <EmotionFormLine
          ref="queryRef"
          :show-info="showInfo"
          @query="getIntervalStatic"
      ></EmotionFormLine>
    </el-affix>

    <AnomalousBehaviorTableForm
        :tableProp="tableProp"
        :tableData="tableDataHead"
        :tableDescribe="tableDescribeHead"
    >
    </AnomalousBehaviorTableForm>


    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="10">
        <div>################################################################</div>
        <el-button @click="jumpTo({erb:templateTableQueryParam7.id,dateStr: endDate})">首板高开</el-button>
        <el-button type="text" @click="buildAbDate({id:templateTableQueryParam7.id,dateStr: endDate})">构建数据</el-button>
        <TemplateQueryTable :query-param="templateTableQueryParam7"
                            :key="time">
        </TemplateQueryTable>

      </el-col>
      <el-col :xs="24" :sm="24" :lg="14">
        <div> %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div>
        <el-button @click="jumpTo({erb:templateTableQueryParam2.id,dateStr: endDate})">二板高于预期</el-button>
        <el-button type="text" @click="buildAbDate({id:templateTableQueryParam2.id,dateStr: endDate})">构建数据</el-button>
        <TemplateQueryTable :query-param="templateTableQueryParam2"
                            :key="time"
        >
        </TemplateQueryTable>
        <el-button @click="jumpTo({erb:templateTableQueryParam3.id,dateStr: endDate})">二板高于预期快速冲板,未上板注意洗盘动作</el-button>
        <el-button type="text" @click="buildAbDate({id:templateTableQueryParam3.id,dateStr: endDate})">构建数据</el-button>
        <TemplateQueryTable :query-param="templateTableQueryParam3"
                            :key="time"
        >
        </TemplateQueryTable>


      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          昨日情绪
          <BaseMintureStatistic
              :query-param="queryParam"
              :char-style="charStypeUpDown"
              :key="time"
          ></BaseMintureStatistic>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          喇叭口
          <BaseDayStandardDeviationStatistic :char-style="charStypeDayMedian"
                                             :key="time"
                                             :begin-date="beginDate"
                                             :end-date="endDate"
          ></BaseDayStandardDeviationStatistic>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div># 破剑式超过1亿需要小心。</div>
          <div># 用兵不复。</div>
          <div> # 客观,不能带有任何主观思想。</div>
          <div> # 首次涨停（查看二板栏板），盘中买，不能开盘买</div>
          <div> # 危机中孕育着希望，一致中孕育着危机。</div>
          <div> # 有的时候，出手的机会只有一次。</div>
          <div> # 高位有量的票，往往都有一次自保的机会。</div>
          <div> # 用价来平衡量</div>
          <div> # 买新不买就</div>
          <div> # 不买抛压重的票</div>


        </div>
      </el-col>
    </el-row>
    <AnomalousBehaviorTableForm
        :tableProp="tableProp"
        :tableData="tableDataBody"
        :tableDescribe="tableDescribeBody"
    >
    </AnomalousBehaviorTableForm>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <BaseDayUpDownStatistic :char-style="charStyleUpDown"
                                :key="time"
                                :begin-date="beginDate"
                                :end-date="queryParam.dateStr"
        ></BaseDayUpDownStatistic>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-button @click="jumpTo({erb:templateTableQueryParam5.id,dateStr: endDate})">首次涨停（查看二板栏板）</el-button>
        <el-button type="text" @click="stockDetail({erb:templateTableQueryParam5.id,dateStr: endDate})">详情</el-button>

        <el-button type="text" @click="buildAbDate({id:templateTableQueryParam5.id,dateStr: endDate})">构建数据</el-button>
        <TemplateQueryTable :query-param="templateTableQueryParam5"
                            :key="time">
        </TemplateQueryTable>
      </el-col>
    </el-row>


    <div>
      <div class="ss" style="width:600px ">

      </div>
      <div class="ss" style="width:600px ">

      </div>
    </div>
  </div>
</template>

<script setup>
import PanelGroup from '@/components/PanelGroup'
import BaseMintureStatistic from "@/view/stock/BaseMintureStatistic";
import BaseDayStandardDeviationStatistic from '@/view/stock/BaseDayStandardDeviationStatistic'
import BaseDayUpDownStatistic from '@/view/stock/BaseDayUpDownStatistic'
import TemplateQueryTable from '@/view/stock/UpLimitTemplateQueryTable'
import EmotionFormLine from '@/view/stock/EmotionMinuteFormLine'
import UpLimitStatic from '@/view/stock/UpLimitStatic'
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import ConfigInfo from "@/constant/ConfigInfo";
import {useRouter} from 'vue-router';
import AnomalousBehaviorTableForm from '@/view/stock/anomalousBehavior/AnomalousBehaviorTableForm'

const router = useRouter()
const showInfo = ref({
  tradeButton: true,
  baseButton: true,
  timeStr: true,
})
const queryRef = ref()
const time = ref()
const beginDate = ref()
const endDate = ref(ConfigInfo.nowDate)
const yesterday = ref()
const queryParam = ref({
  dateStr: yesterday.value,
  objectSign: "minute_emotion_statistic",
  timeInterval: 2
})
const tableDataHead = ref([])
const tableProp = ref([])
const tableDescribeHead = ref({})


const tableDataBody = ref([])
const tableDescribeBody = ref({})

const templateTableQueryParam2 = ref({
  id: '1505216687434235904',
  dateStr: endDate.value,
})
const templateTableQueryParam3 = ref({
  id: '1505357737901555712',
  dateStr: endDate.value,
})

const templateTableQueryParam5 = ref({
  id: '1506450265249808384',
  dateStr: endDate.value,
})

const templateTableQueryParam7 = ref({
  id: '1505911842550185984',
  dateStr: endDate.value,
})
const charStypeUpDown = {width: '100%', height: '300px'};
const charStypeDayMedian = {width: '100%', height: '300px'};

function getIntervalStatic() {
  if (queryRef.value == null) {
    return;
  }
  endDate.value = queryRef.value.queryParam.dateStr;
  templateTableQueryParam2.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam3.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam5.value.dateStr = queryRef.value.queryParam.dateStr;
  templateTableQueryParam7.value.dateStr = queryRef.value.queryParam.dateStr;

  axios.post(AxiosUrl.river.calendar.getSpecialDay, {
    dateStr: endDate.value,
    dateProp: 1,
    addDay: -15
  }).then((res) => {
    beginDate.value = res;
    axios.post(AxiosUrl.river.calendar.getSpecialDay, {
      dateStr: endDate.value,
      dateProp: 1,
      addDay: -1
    }).then((res) => {
      queryParam.value.dateStr = res;
      time.value = new Date().getTime();
    });
  });

  getAllAnomalousBehaviorData();

}

function jumpTo(routerParam) {
  const {href} = router.resolve({name: "index4", query: routerParam});
  window.open(href, '_blank');
}

function stockDetail(routerParam) {
  const {href} = router.resolve({name: "OpenWatch3", query: routerParam});
  window.open(href, '_blank');
}

function buildAbDate(routerParam) {
  const {href} = router.resolve({name: "index36", query: routerParam});
  window.open(href, '_blank');
}

function getAllAnomalousBehaviorData() {
  tableDataHead.value.length = 0
  tableProp.value.length = 0
  tableDescribeHead.value.length = 0
  tableDataBody.value.length = 0
  tableDescribeBody.value.length = 0

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

  axios.post(AxiosUrl.river.calendar.getDate, {
    dateStr: queryRef.value.queryParam.dateStr,
    dateProp: 1,
    addDay: -30,
  }).then((res) => {
    res.forEach(dateStr => {
      let dateStrIndex = {
        prop: dateStr,
        label: dateStr,
      }
      tableProp.value.push(dateStrIndex);
    })
  })

  let headIdAdd = []
  headIdAdd.push('1516041839138963456')
  getTablePropHeadForm(headIdAdd);

  let bodyIdAdd = []
  bodyIdAdd.push('1516067414108930048')
  getTablePropBodyForm(bodyIdAdd);

}

function getTablePropHeadForm(plateIds) {
  axios.post(AxiosUrl.stock.stockAnomalousBehavior.getAllAnomalousBehaviorData, {
    dateStr: queryRef.value.queryParam.dateStr,
    plateList: plateIds
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
      tableDescribeHead.value = allDescribeMap;
      tableDataHead.value.push(tableColumnIndex);
    }

  });
}


function getTablePropBodyForm(plateIds) {
  axios.post(AxiosUrl.stock.stockAnomalousBehavior.getAllAnomalousBehaviorData, {
    plateList: plateIds,
    dateStr: queryRef.value.queryParam.dateStr,
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
      tableDescribeBody.value = allDescribeMap;
      tableDataBody.value.push(tableColumnIndex);
    }

  });
}


onMounted(() => {
  getAllAnomalousBehaviorData();
})


</script>

<style scoped>
.bg-purple {
  background: #b3e8ea;
}

.ss {
  display: inline
}

.grid-content {
  border-radius: 10px;
  min-height: 200px;
}

</style>
