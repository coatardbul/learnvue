<template>
  <div class="chart-minuter-emotion" v-for="item in 20" :key="item">
    {{hee(item)}}
  </div>
</template>

<script setup>
import {computed} from "vue";
function hee(num){
  return num +100;
}

const sb=computed((num)=>{
  return num +100;
})

</script>

<style scoped>

</style>
