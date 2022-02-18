<template>
  <div>孙孙孙子</div>
  <div>孙孙孙子{{ty}}</div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "GrandSon.vue",
  setup() {
    const ty = inject("price");
    return {ty}
  }
}
</script>

<style scoped>

</style>
