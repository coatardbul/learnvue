<template>
  <el-row>
    <el-col :span="24"><div class="grid-content" /></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12"><div class=" bg-purple" /></el-col>
    <el-col :span="12"><div class=" bg-purple" /></el-col>
  </el-row>

</template>

<style>
.el-row {
  margin-bottom: 30px;
}

.bg-purple {
  border-radius: 4px;
  min-height: 36px;
  background-color: #18bd18;}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: #ce1121;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
