<template>
  <div>
    <el-button  type="warning"  plain @click="ss">收盘预览</el-button>
  </div>
  <div>
    <el-button color="#e3b726"  @click="tt('CloseWatch1')">昨曾模式详情</el-button>
  </div>
  <div>
    <el-button  type="warning" @click="tt('CloseWatch2')">盘中信息</el-button>
  </div>


</template>

<script  setup>
import { useRouter } from 'vue-router';

const router=useRouter()

function ss(){
  const{ href } = router.resolve({name:"CloseWatch",query:{}});
  window.open(href,'_blank');
}
function tt(url){
  const{ href } = router.resolve({name:url,query:{}});
  window.open(href,'_blank');
}
</script>

<style scoped>

</style>
