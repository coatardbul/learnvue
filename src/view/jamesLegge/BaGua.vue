<template>
  <keep-alive v-for="item in guaXiangArr" :key="item">
    <Yang v-if="item==1"></Yang>
    <Yin v-else></Yin>
  </keep-alive>
  <el-link :href="guaxiangInfo.url" target="_blank">{{ guaxiangInfo.name }}</el-link>
</template>

<script>
import Yang from '@/view/jamesLegge/Yang'
import Yin from '@/view/jamesLegge/Yin'

export default {
  name: "BaGua.vue",
  components: {
    Yang,
    Yin,
  },
  props: {
    guaXiangArr: {
      Type: Array,
    },
    guaxiangInfo: {
      Type: Object,
    }
  },
}
</script>

<style scoped>

</style>
