<template>

  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      router
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location/>
        </el-icon>
        <span>股市风云</span>
      </template>
      <el-menu-item index="index1">echars示例</el-menu-item>
      <el-menu-item index="index2">刷新统计数据</el-menu-item>
      <el-menu-item index="index3">模板数据</el-menu-item>
      <el-menu-item index="index4">查询例句</el-menu-item>
      <el-menu-item index="index5">标准差统计</el-menu-item>
      <el-menu-item index="index6">菜单六</el-menu-item>
      <el-menu-item index="index7">菜单7</el-menu-item>
      <el-menu-item index="index8">菜单8</el-menu-item>
      <el-menu-item index="index9">标准查统计查询</el-menu-item>
      <el-menu-item index="index10">当日情绪</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location/>
        </el-icon>
        <span>易经杂谈</span>
      </template>
      <el-menu-item index="jamesLegge1">64卦</el-menu-item>
      <el-menu-item index="jamesLegge2">链接</el-menu-item>
      <el-menu-item index="jamesLegge3">图片</el-menu-item>
      <el-menu-item index="jamesLegge4">4444</el-menu-item>
      <el-menu-item index="jamesLegge5">5555</el-menu-item>
      <el-menu-item index="jamesLegge6">6666</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span>Navigator three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>
<script  setup>



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
