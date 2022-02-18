<template>
  <div>父组件</div>
  <span  @click="changePrice">爸爸的{{price}}</span>
  <Son ref='sssss' :sb="money" @change-money="updateMoney"></Son>
  <grand-son></grand-son>
</template>

<script>
import Son from './Son'
import GrandSon from './GrandSon'
import {provide, ref} from 'vue'

export default {
  name: "Num7.vue",
  components: {
    Son,GrandSon
  },
  setup() {
    const price=ref(100)
    provide("price",price)
    const money = ref(100)
    const updateMoney = (newMney) => {
      money.value=newMney
    }
    const changePrice=()=>{
      price.value=22
    }
    return {
      money,updateMoney,price,changePrice
    }
  }
}
</script>

<style scoped>

</style>
