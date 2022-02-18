<template>

  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      router
  >
    <template v-for="(item,index) in fileterNum('0',list)" :key="item">
      <template v-if="item.routerUrl">
        <el-menu-item :index="item.routerUrl">{{ item.name }}</el-menu-item>
      </template>
      <template v-else-if="item.routerUrl.length==0">
        <el-sub-menu :index="index+''">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-if="item.hasChildren">
            <el-menu-item v-for="subItem in  fileterNum(item.id,list)" :key="subItem" :index="subItem.routerUrl">
              {{ subItem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <div></div>
      </template>
    </template>

  </el-menu>
</template>
<script setup>

import { onMounted,  ref, } from "vue";
import axios from "axios";
import AxiosUrl from '/src/constant/AxiosUrl';
import CollectionUtils from '/src/util/CollectionUtils'
const list = ref([
  {
    id: '111111',
    name: '菜单1',
    parentId: '0',
    routerUrl: '/index1',
    sequent: 1,
    icon: '',
    hasChildren: false
  },
  {
    hasChildren: false,
    icon: "",
    id: "1491301519516106752",
    name: "股市风云",
    parentId: "0",
    routerUrl: "",
    sequent: 1
  }
])

function getMenuInfo() {
  axios.post(AxiosUrl.river.menu.getAllMenu, {}).then((res) => {
    list.value.length=0
    res.sort(CollectionUtils.compareAsc('sequent'))
    res.forEach(v => {
      let menuObject = {
        id: v.id,
        name: v.menuName,
        parentId: v.parentMenuId,
        routerUrl: v.routerUrl==null?'':v.routerUrl,
        sequent: v.sequent,
        icon: v.icon,
        hasChildren: fileterResNum(v.parentMenuId,res).length>0
      }
      list.value.push(menuObject)
    })

  })
}


onMounted(() => {
  list.value.length=0
  getMenuInfo()

})

function fileterResNum(id, list) {
  return list.filter((v) => {
    return v.parentMenuId == id
  })
}

function fileterNum(id, list) {
  return list.filter((v) => {
    return v.parentId == id
  })
}


</script>
<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #a04417;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #e3b726;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .el-main {
  background-color: #911d62;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
