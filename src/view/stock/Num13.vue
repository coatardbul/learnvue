<template>

  <div>
    <el-button type="text" @click="ss('9002/river')">river</el-button>
  </div>
  <div>
    <el-button type="text" @click="ss('9006/stock')">stock</el-button>
  </div>
</template>
<script setup>
function ss(routerUrl) {
  let addr = window.location.protocol+'//'+ window.location.hostname+':';

  window.open(addr+routerUrl+'/swagger-ui.html', '_blank');
}
</script>
