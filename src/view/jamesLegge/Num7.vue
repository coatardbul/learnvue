<template>
  <keep-alive v-for="item1 in guaXiangArr1" :key="item1">
    <Yang v-if="item1==1"></Yang>
    <Yin v-else></Yin>
  </keep-alive>
  <!--  <component   v-for="item1 in guaXiangArr1" :key="item1" v-bind:is="currentTabComponent(item1)"></component>-->
  <!--  <component   :is="sb"></component>-->


  <div>{{ guaxiangInfo.name }}</div>
</template>

<script>
import Yang from '@/view/jamesLegge/Yang'
import Yin from '@/view/jamesLegge/Yin'
import {reactive, ref} from "vue";

export default {
  name: "BaGua.vue",
  components: {
    // 声明要使用哪些组件
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
  setup(props, content) {
    const guaXiangArr1=ref([1,0,1,1,0,1,1])
    const item = ref(1)

    function currentTabComponent(item){
      if(item==1){
        return <Yang></Yang>;
      }
      if(item==0){
        return <Yin></Yin>;
      }
    }
    function sb(){
      return <Yang></Yang>;
    }
    return{
      item,guaXiangArr1,currentTabComponent,sb
    }
  }
}
</script>

<style scoped>

</style>
