<template>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,1,1,1]"
              :guaxiang-info="{name:'乾为天',url:'https://www.k366.com/gua/1200000-11-01.htm'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,1,1,0]"
              :guaxiang-info="{name:'天风姤'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,1,0,0]"
              :guaxiang-info="{name:'天山遁'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,0,0,0]"
              :guaxiang-info="{name:'天地否'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,0,0,0]"
              :guaxiang-info="{name:'风地观'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,0,0,0]"
              :guaxiang-info="{name:'山地剥'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,0,0,0]"
              :guaxiang-info="{name:'火地晋'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,1,1,1]"
              :guaxiang-info="{name:'火天大有'}"
      ></ba-gua>
    </el-col>
  </el-row>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,0,1,0]"
              :guaxiang-info="{name:'坎为水'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,0,1,1]"
              :guaxiang-info="{name:'水泽节'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,0,0,1]"
              :guaxiang-info="{name:'水雷屯'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,1,0,1]"
              :guaxiang-info="{name:'水火既济'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,1,0,1]"
              :guaxiang-info="{name:'泽火革'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,1,0,1]"
              :guaxiang-info="{name:'雷火丰'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,1,0,1]"
              :guaxiang-info="{name:'地火明夷'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,0,1,0]"
              :guaxiang-info="{name:'地水师'}"
      ></ba-gua>
    </el-col>
  </el-row>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,1,0,0]"
              :guaxiang-info="{name:'艮为山'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,1,0,1]"
              :guaxiang-info="{name:'山火贲'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,1,1,1]"
              :guaxiang-info="{name:'山天大畜'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,0,1,1]"
              :guaxiang-info="{name:'山泽损'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,0,1,1]"
              :guaxiang-info="{name:'火泽睽'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,0,1,1]"
              :guaxiang-info="{name:'天泽履'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,0,1,1]"
              :guaxiang-info="{name:'风泽中孚'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,1,0,0]"
              :guaxiang-info="{name:'风山渐'}"
      ></ba-gua>
    </el-col>
  </el-row>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,0,0,1]"
              :guaxiang-info="{name:'震为雷'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,0,0,0]"
              :guaxiang-info="{name:'雷地豫'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,0,1,0]"
              :guaxiang-info="{name:'雷水解'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,1,1,0]"
              :guaxiang-info="{name:'雷风恒'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,1,1,0]"
              :guaxiang-info="{name:'地风升'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,1,1,0]"
              :guaxiang-info="{name:'水风井'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,1,1,0]"
              :guaxiang-info="{name:'泽风大过'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,0,0,1]"
              :guaxiang-info="{name:'泽雷随'}"
      ></ba-gua>
    </el-col>
  </el-row>

  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,1,1,0]"
              :guaxiang-info="{name:'巽为风'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,1,1,1]"
              :guaxiang-info="{name:'风天小畜'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,1,0,1]"
              :guaxiang-info="{name:'风火家人'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,0,0,1]"
              :guaxiang-info="{name:'风雷益'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,0,0,1]"
              :guaxiang-info="{name:'天雷无妄'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,0,0,1]"
              :guaxiang-info="{name:'火雷噬嗑'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,0,0,1]"
              :guaxiang-info="{name:'山雷颐'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,1,1,0]"
              :guaxiang-info="{name:'山风蛊'}"
      ></ba-gua>
    </el-col>
  </el-row>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,1,0,1]"
              :guaxiang-info="{name:'离为火'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,1,0,0]"
              :guaxiang-info="{name:'火山旅'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,1,1,0]"
              :guaxiang-info="{name:'火风鼎'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,1,0,1,0]"
              :guaxiang-info="{name:'火水未济'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,0,0,0,1,0]"
              :guaxiang-info="{name:'山水蒙'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,0,0,1,0]"
              :guaxiang-info="{name:'风水涣'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,0,1,0]"
              :guaxiang-info="{name:'天水讼'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[1,1,1,1,0,1]"
              :guaxiang-info="{name:'天火同人'}"
      ></ba-gua>
    </el-col>
  </el-row>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,0,0,0]"
              :guaxiang-info="{name:'坤为地'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,0,0,1]"
              :guaxiang-info="{name:'地雷复'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,0,1,1]"
              :guaxiang-info="{name:'地泽临'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,1,1,1]"
              :guaxiang-info="{name:'地天泰'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,1,1,1]"
              :guaxiang-info="{name:'雷天大壮'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,1,1,1]"
              :guaxiang-info="{name:'泽天夬'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,1,1,1]"
              :guaxiang-info="{name:'水天需'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,0,0,0]"
              :guaxiang-info="{name:'水地比'}"
      ></ba-gua>
    </el-col>
  </el-row>
  <el-row :gutter="80">
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,0,1,1]"
              :guaxiang-info="{name:'兑为泽'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,0,1,0]"
              :guaxiang-info="{name:'泽水困'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,0,0,0]"
              :guaxiang-info="{name:'泽地萃'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,1,1,0,0]"
              :guaxiang-info="{name:'泽山咸'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,1,0,1,0,0]"
              :guaxiang-info="{name:'水山蹇'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,0,1,0,0]"
              :guaxiang-info="{name:'地山谦'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,1,0,0]"
              :guaxiang-info="{name:'雷山小过'}"
      ></ba-gua>
    </el-col>
    <el-col :span="3">
      <ba-gua :gua-xiang-arr="[0,0,1,0,1,1]"
              :guaxiang-info="{name:'雷泽归妹'}"
      ></ba-gua>
    </el-col>
  </el-row>


</template>

<script setup>
import BaGua from '@/view/jamesLegge/BaGua'

</script>

<style scoped>
.el-row {
  margin-bottom: 40px;
}
</style>
