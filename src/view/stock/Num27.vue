<template>
  <div>昨曾模式</div>
  <div>外侧</div>
  <div>昨日2，3，4板数量</div>
  <div>首班高开，或者一直涨停</div>
  <div>跌幅前20数据</div>
  <div>破剑式</div>
  <div >昨曾模式</div>
  <div  @click="ss">点我打开收盘预览</div>
</template>

<script  setup>
import { useRouter } from 'vue-router';

const router=useRouter()

function ss(){
  const{ href } = router.resolve({name:"CloseWatch",query:{}});
  window.open(href,'_blank');
}
</script>

<style scoped>

</style>
