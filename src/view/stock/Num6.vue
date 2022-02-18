<template>
<Num1 ref="getRefInfo"></Num1>
  <div   ref="aaaaaa">skljfldsjflsd</div>
  <span @click="change">sb</span>
</template>

<script setup>
import Num1 from './Num1'
import {onMounted} from "vue";
// onMounted(() =>{
//   console.log(this.$refs.getRefInfo)
//
// })
function change() {

}

</script>

<style scoped>

</style>
