<template>
  <el-affix :offset="90">

    <el-form :inline="true" :model="queryParam" class="demo-form-inline">
      <el-form-item label="列总数">
        <el-input v-model.number="queryParam.colTotal" type="number" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="lastDay">上一交易日</el-button>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="afterDay">下一交易日</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="getJiangEnInfo">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-affix>
  <div class="big-body" :key="time">
    <div class="jiang-en-column" v-for="i in queryParam.colTotal" :key="i">
      <div :class="specialColClass(i,j)" v-for="j in queryParam.colTotal" :key="j">
        {{ getValueByArr(i, j) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {mixin, onMounted, onUpdated, reactive, ref} from "vue";
import ConfigInfo from "@/constant/ConfigInfo";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import EmotionFormLine from './EmotionMinuteFormLine'

const time = ref(null)
const days = ref(1)

const jiangEnDateInfo = ref([
  //   {
  //   dateStr: '2018-01-29',
  //   remark: '3587高点（2018-01-29）计算天数偏离太大',
  //   type:1,
  //   num: 1
  // },
  // {
  //   dateStr: '2019-01-04',
  //   remark: '2440低点（2019-01-04）计算天数偏离太大',
  //   type:2,
  //   num: 1
  // },
  {
    dateStr: '2020-03-19',
    remark: '2646低点（2020-03-19）',
    type:2,
    num: 1
  },
  {
    dateStr: '2021-02-18',
    remark: '3731高点（2021-02-18）',
    type: 1,
    num: 1
  },
  {
    dateStr: '2021-07-28',
    remark: '3312低点（2021-07-28）',
    type: 2,
    num: 1
  },
  {
    dateStr: '2021-09-14',
    remark: '3723高点（2021-09-14）',
    type: 2,
    num: 1
  },
])

//结果集
const colArr = reactive([])
const queryParam = reactive({
  dateStr: ConfigInfo.nowDate,
  colTotal: ConfigInfo.jiangEnNum,
})

function specialColClass(i, j) {
  let find = jiangEnDateInfo.value.find(item=>item.num==getValueByArr(i, j));
  if(find){
    if(find.type==1){
      return 'jiang-en-row-height-over';
    }else {
      return 'jiang-en-row-low-over';
    }
  }else if (i == Math.ceil(queryParam.colTotal / 2) || j == Math.ceil(queryParam.colTotal / 2)) {
    return 'jiang-en-row-special-line';
  } else if (i == j || i + j == queryParam.colTotal + 1) {
    return 'jiang-en-row-special-cross';
  } else {
    return 'jiang-en-row';
  }
}

// function mouseover($event) {
//   $event.currentTarget.className = "jiang-en-row-low-over";
// }
//
// function mouseleave($event) {
//   $event.currentTarget.className = "jiang-en-row";
// }

function reset() {
  queryParam.colTotal = ConfigInfo.jiangEnNum;
  queryParam.dateStr = ConfigInfo.nowDate;
  getJiangEnInfo();
}

function getJiangEnInfo() {
  if (colArr.length != queryParam.colTotal) {
    rebuildAndReload();
  }
  for(let dateInfo of jiangEnDateInfo.value){
      axios.post(AxiosUrl.river.calendar.getSubtractDay, {
        beginDate: dateInfo.dateStr,
        endDate: queryParam.dateStr,
        dateProp: 1,
      }).then((res) => {
          dateInfo.num=res;
      });
  }
  time.value=new Date().getMilliseconds();
}

function lastDay() {
  axios.post(AxiosUrl.river.calendar.getSpecialDay, {
    dateStr: queryParam.dateStr,
    dateProp: 1,
    addDay: -1
  }).then((res) => {
    queryParam.dateStr = res
    getJiangEnInfo();

  });
}

function afterDay() {
  axios.post(AxiosUrl.river.calendar.getSpecialDay, {
    dateStr: queryParam.dateStr,
    dateProp: 1,
    addDay: 1
  }).then((res) => {
    queryParam.dateStr = res
    getJiangEnInfo();
  });
}


function rebuildAndReload() {
  colArr.length = 0;
  //重置
  for(let dateInfo of jiangEnDateInfo.value){
    dateInfo.num=1;
  }
  getInitArray();
  computerAndRebuildArr();
}


//通过算法获取数组
function computerAndRebuildArr() {
  let centerNum = Math.ceil(queryParam.colTotal / 2);
  let count = 1;
  let addNum = 2;
  setArrNum(centerNum, centerNum, count, colArr);
  let iNum = centerNum;
  let jNum = centerNum - 1;
  for (let allTime = 0; allTime < centerNum - 1; allTime++) {
    //从下往上
    for (let i = iNum; i > iNum - addNum; i--) {
      setArrNum(i, jNum, ++count, colArr);
    }
    iNum -= (addNum - 1);

    //从左到右
    for (let i = ++jNum; i < jNum + addNum; i++) {
      setArrNum(iNum, i, ++count, colArr);
    }
    jNum += (addNum - 1);

    //从上到下
    for (let i = ++iNum; i < iNum + addNum; i++) {
      setArrNum(i, jNum, ++count, colArr);
    }
    iNum += (addNum - 1);

    //从右到左
    for (let i = --jNum; i > jNum - addNum; i--) {
      setArrNum(iNum, i, ++count, colArr);
    }
    jNum -= (addNum - 1);
    jNum--;
    addNum += 2;
  }

}

//给数字设置值
function setArrNum(i, j, num, arr) {
  if (i == 0 || i > queryParam.colTotal) {
    return;
  }
  if (j == 0 || j > queryParam.colTotal) {
    return;
  }
  arr[i - 1][j - 1] = num;
}

//根据坐标获取数组上的值
function getValueByArr(i, j) {
  if (colArr.length != queryParam.colTotal) {
    rebuildAndReload();
  }
  if (colArr.length < i) {
    return '加载中';
  }
  if (colArr[i - 1].length < j) {
    return '加载中';
  }
  return colArr[i - 1][j - 1];
}

//获取初始化的数组
function getInitArray() {
  for (let i = 0; i < queryParam.colTotal; i++) {
    let colIndexArr = [];
    for (let j = 0; j < queryParam.colTotal; j++) {
      colIndexArr.push(0);
    }
    colArr.push(colIndexArr);
  }
}

onMounted(() => {
  getJiangEnInfo();
})

</script>

<style scoped>
.jiang-en-row {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-style: solid;
  /*border-width: 5px;*/
  border-color: #a3c7ad;
  /*background-color: powderblue;*/
  text-align: center;
  vertical-align: middle;
}

.big-body {
  position: relative;
  left: 200px;
  /*border: 3px solid #73AD21;*/

}

/*特殊字段*/
.jiang-en-row-special-line {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-style: solid;
  /*border-width: 5px;*/
  font-size: 20px;
  font-weight: bold;
  border-color: #5fa25f;
  /*background-color: #da8127;*/
  color: #852121;
  text-align: center;
  vertical-align: middle;
}

.jiang-en-row-special-cross {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-style: solid;
  /*border-width: 5px;*/
  /*font-size: 15px;*/
  font-weight: bold;
  border-color: #e3b726;
  /*background-color: #da8127;*/
  color: #e3b726;
  text-align: center;
  vertical-align: middle;
}


.jiang-en-row-low-over {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-style: solid;
  /*border-width: 5px;*/
  /*font-size: 20px;*/
  font-weight: bold;
  border-color: #5fa25f;
  background-color: #18bd18;
  color: #852121;
  text-align: center;
  vertical-align: middle;
}
.jiang-en-row-height-over {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-style: solid;
  /*border-width: 5px;*/
  /*font-size: 20px;*/
  font-weight: bold;
  border-color: #5fa25f;
  background-color: #ce1121;
  color: #852121;
  text-align: center;
  vertical-align: middle;
}



</style>
