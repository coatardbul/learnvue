<template>
  <div>昨曾模式</div>
  <div>外侧</div>
  <div>昨日2，3，4板数量</div>
  <div>首班高开，或者一直涨停</div>
  <div>跌幅前20数据</div>
  <div>破剑式</div>
  <div >昨曾模式</div>
  <div>
    <el-button  type="warning"  plain @click="ss">收盘预览</el-button>
  </div>
  <div>
    <el-button color="#e3b726"  @click="tt">昨曾模式详情</el-button>
  </div>



</template>

<script  setup>
import { useRouter } from 'vue-router';

const router=useRouter()

function ss(){
  const{ href } = router.resolve({name:"CloseWatch",query:{}});
  window.open(href,'_blank');
}
function tt(){
  const{ href } = router.resolve({name:"CloseWatch1",query:{}});
  window.open(href,'_blank');
}
</script>

<style scoped>

</style>
