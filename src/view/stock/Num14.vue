<template>
<div>昨日情绪缩略图</div>
  <div>喇叭口数据</div>
  <div>昨日2，3，4板数量</div>
  <div>首班高开，或者一直涨停</div>
  <div>跌幅前20数据</div>
  <div>破剑式</div>
  <div >昨曾模式</div>
  <div  @click="ss('AllWatch')">点我打开开盘预览</div>
  <div  @click="ss('OpenWatch1')">点我打开开盘预览1</div>
  <div  @click="ss('OpenWatch2')">点我打开开盘预览2</div>

</template>

<script  setup>
import { useRouter } from 'vue-router';

const router=useRouter()

function ss(routerUrl){
  const{ href } = router.resolve({name:routerUrl,query:{}});
  window.open(href,'_blank');
}
</script>

<style scoped>

</style>
