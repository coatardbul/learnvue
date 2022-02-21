<template>
  <el-form :inline="true" :model="queryParam" class="demo-form-inline">
    <el-form-item label="列总数">
      <el-input v-model="queryParam.colTotal" type="number" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker v-model="queryParam.dateStr" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="getColStatic">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

  <div class="big-body"  :key="time">
    <div class="jiang-en-column" v-for="i in queryParam.colTotal" >
      <div class="jiang-en-row" v-for="j in queryParam.colTotal"  @mouseover="mouseover($event)"
           @mouseleave="mouseleave($event)">
        <!--        {{ i + ':' + j }}-->
        {{ getValueByArr(i, j) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import ConfigInfo from "@/constant/ConfigInfo";

const  time =ref(null)
const colArr = reactive([])
const queryParam = reactive({
  dateStr: ConfigInfo.nowDate,
  colTotal: 11,
})

function mouseover($event) {
  $event.currentTarget.className = "jiang-en-row-over";
}

function mouseleave($event) {
  $event.currentTarget.className = "jiang-en-row";
}

// function reset(){
//   queryParam.colTotal=11;
//   queryParam.dateStr=ConfigInfo.nowDate;
// }


function getColStatic(){
  debugger
  colArr.length=0;
  getArray();
  computerNum();
  time.value=new Date();

}


function computerNum() {
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


function getValueByArr(i, j) {
  if (colArr.length < i) {
    return '加载中';
  }
  if (colArr[i - 1].length < j) {
    return '加载中';
  }
  return colArr[i - 1][j - 1];
}


function getArray() {
  for (let i = 0; i < queryParam.colTotal; i++) {
    let colIndexArr = [];
    for (let j = 0; j < queryParam.colTotal; j++) {
      colIndexArr.push(0);
    }
    colArr.push(colIndexArr);
  }
}

onMounted(() => {
  getArray();
  computerNum();
})

</script>

<style scoped>
.jiang-en-row {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-style: solid;
  /*border-width: 5px;*/
  border-color: #5fa25f;
  /*background-color: powderblue;*/
  color: #77133c;
  text-align: center;
  vertical-align: middle;
}

.big-body {
  position: relative;
  left: 200px;
  /*border: 3px solid #73AD21;*/

}

.jiang-en-row-over {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-style: solid;
  /*border-width: 5px;*/
  border-color: #5fa25f;
  background-color: #da8127;
  color: #77133c;
  text-align: center;
  vertical-align: middle;
}


</style>
