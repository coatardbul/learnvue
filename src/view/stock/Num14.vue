<template>
  <div>
    <el-button type="text"  @click="ss('AllWatch')">情绪综合图谱</el-button>
  </div>
  <div>
    <el-button type="text"  @click="ss('OpenWatch1')">首板，二板预览界面</el-button>
  </div> <div>
  <el-button type="text"  @click="ss('OpenWatch2')">两板以上涨停预览界面</el-button>
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
