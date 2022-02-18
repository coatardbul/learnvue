<template>
<div>子组件</div>
  <span>{{sb}}</span>
  <button @click="changeMoney">花钱</button>
</template>

<script>
export default {
  name: "Son",
  props:{
    sb:{
      default:11
    }
  },
  setup(props,context){
    const changeMoney=()=>{
      context.emit('change-money',60)
    }
    return{
      changeMoney
    }
  }
}
</script>

<style scoped>

</style>
