<template>
  <div :style="{width:'100%',height:'800px'}" id="container"></div>

</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  var map = new BMapGL.Map('container');
  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
  var cr = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(20, 20)
  });   //设置版权控件位置
  map.addControl(cr); //添加版权控件
  var bs = map.getBounds();   //返回地图可视区域
  cr.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655366862&t=eae27ea2158b8df387a2dcca6205dcf4' width='200px' height='300px'/><a href='#' style='font-size:16px;color:#000'>@我是自定义版权控件呀</a>",
    bounds: bs
  });
})
</script>
