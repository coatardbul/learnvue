<template>
  <div>
    <el-button type="text" @click="ss('AllWatch')">情绪综合图谱</el-button>
  </div>
  <div>
    <el-button type="text" @click="ss('OpenWatch1')">首板，二板预览界面</el-button>
  </div>
  <div>
    <el-button style="color: #ce1121" type="text" @click="ss('OpenWatch2')">两板以上涨停预览界面</el-button>
  </div>
  <div>
    <el-button style="color: #ce1121" type="text" @click="ss('OpenWatch4')">首板，二板预览界面(新)</el-button>
  </div>
  <div>
    <el-button style="color: #ce1121" type="text" @click="vv('OpenWatch7','FIRST_UP_LIMIT')">二板预览界面(新)</el-button>
  </div>
  <div>
    <el-button type="text" @click="ss('OpenTheme')">一进二，二板以上题材</el-button>
  </div>
  <div>
    <el-button type="text" @click="tt('OpenWatch5')">题材全量查询</el-button>
  </div>
  <div>
    <el-button type="text" @click="tt('OpenWatch6')">开局总揽</el-button>
  </div>
  <div>
    <el-button style="color: #ce1121" type="text" @click="vv('FilterUpLimitInfo','FIRST_UP_LIMIT')">首板，二板过滤涨停信息</el-button>
  </div>
  <div>
    <el-button style="color: #ce1121" type="text" @click="vv('FilterUpLimitInfo','TWO_UP_LIMIT_ABOVE')">二板以上过滤涨停信息</el-button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import ConfigInfo from "@/constant/ConfigInfo";

const router = useRouter()

function ss(routerUrl) {
  const {href} = router.resolve({name: routerUrl, query: {}});
  window.open(href, '_blank');
}
function tt(routerUrl) {
  const {href} = router.resolve({name: routerUrl, query: {erb: '1521529988216651776',dateStr: ConfigInfo.nowDate}});
  window.open(href, '_blank');
}
function vv(routerUrl,templateSignStr) {
  const {href} = router.resolve({name: routerUrl, query: {templateSign: templateSignStr,dateStr: ConfigInfo.nowDate}});
  window.open(href, '_blank');
}
</script>

<style scoped>

</style>
