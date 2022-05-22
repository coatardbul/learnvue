<template>
  <div :style="{width:'100%',height:'800px'}" id="container"></div>

</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  var map = new BMapGL.Map('container');
  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
  map.enableScrollWheelZoom(true);
  var cr = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(200, 60)
  });   //设置版权控件位置
  map.addControl(cr); //添加版权控件
  var bs = map.getBounds();   //返回地图可视区域
  cr.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655366862&t=eae27ea2158b8df387a2dcca6205dcf4' width='200px' height='300px'/>",
    bounds: bs
  });
  var cr1 = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(300, 120)
  });   //设置版权控件位置
  map.addControl(cr1); //添加版权控件
  var bs1 = map.getBounds();   //返回地图可视区域
  cr1.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367222&t=8c1601f0e8a80204c5b07c9da621bab4' width='200px' height='200px'/>",
    bounds: bs
  });
  var cr2 = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(1000, 400)
  });   //设置版权控件位置
  map.addControl(cr2); //添加版权控件
  var bs2 = map.getBounds();   //返回地图可视区域
  cr2.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242312005c1-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655366862&t=3763b0f4285413f75547ee576becbcf3' width='200px' height='200px'/>",
    bounds: bs
  });



  



})
</script>
