<template>
  <div class="big-body">
    <div class="jiang-en-column" v-for="i in 19" :key="i">
      <div class="jiang-en-row" v-for="j in 19" :key="j" @mouseover="mouseover($event)"
           @mouseleave="mouseleave($event)">
        {{ i + ':' + j }}
      </div>
    </div>
  </div>
</template>

<script setup>

function mouseover($event) {
  $event.currentTarget.className = "jiang-en-row-over";
}

function mouseleave($event) {
  $event.currentTarget.className = "jiang-en-row";
}

function computerNum(i, j, num) {

}

function getArray(num) {

}


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
  left: 130px;
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
