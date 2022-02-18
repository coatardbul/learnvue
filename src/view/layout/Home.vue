<template>
  <el-container>
    <LeftAside></LeftAside>
    <el-container>
      <HeaderTop/>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        底部
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import LeftAside from "@/view/layout/LeftAside";
import HeaderTop from "@/view/layout/HeaderTop";
// import Footer from "@/view/layout/Footer";

export default {
  name: 'Home',
  components: {LeftAside, HeaderTop}
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
