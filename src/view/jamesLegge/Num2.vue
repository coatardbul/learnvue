<template>
  <el-link href="https://www.gpbctv.com/rjjc/202104/157191.html" target="_blank">链接</el-link>
  <div>
    <el-button style="color: #47ce11" type="text" @click="ss('jamesLegge6')">分宫次序图</el-button>
  </div>
  <div>
    <el-button style="color: #47ce11" type="text" @click="ss('jamesLegge3')">图片</el-button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
const router = useRouter()

function ss(routerUrl) {
  const {href} = router.resolve({name: routerUrl, query: {}});
  window.open(href, '_blank');
}
</script>

<style scoped>

</style>
