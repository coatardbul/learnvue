
<template>
  <grid-layout
      :layout="layout"
      :auto-size="false"
      :col-num="12"
      :row-height="100"
      :max-rows="100"
      :is-draggable="true"
      :is-resizable="false"
      :vertical-compact="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
  >

    <grid-item v-for="item in layout" :key="item.i"
               :item="watchitem(item)"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"
               @resize="resizeEvent"
               @move="moveEvent"
               @resized="resizedEvent"
               @moved="movedEvent"
    >
      {{item.i}}
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'

var testLayout = [
  {"x":0,"y":0,"w":1,"h":1,"i":"0"},
  {"x":1,"y":0,"w":1,"h":1,"i":"1"},
  {"x":2,"y":0,"w":1,"h":1,"i":"2"},
  {"x":3,"y":0,"w":1,"h":1,"i":"3"},
  {"x":4,"y":0,"w":1,"h":1,"i":"4"},
  {"x":0,"y":1,"w":1,"h":1,"i":"5"},
  {"x":1,"y":1,"w":1,"h":1,"i":"6"},
  {"x":2,"y":1,"w":1,"h":1,"i":"7"},
  {"x":3,"y":1,"w":1,"h":1,"i":"8"},
  {"x":4,"y":1,"w":1,"h":1,"i":"9"},
];
var historyLayout = [
  {"x":0,"y":0,"w":1,"h":1,"i":"0"},
  {"x":1,"y":0,"w":1,"h":1,"i":"1"},
  {"x":2,"y":0,"w":1,"h":1,"i":"2"},
  {"x":3,"y":0,"w":1,"h":1,"i":"3"},
  {"x":4,"y":0,"w":1,"h":1,"i":"4"},
  {"x":0,"y":1,"w":1,"h":1,"i":"5"},
  {"x":1,"y":1,"w":1,"h":1,"i":"6"},
  {"x":2,"y":1,"w":1,"h":1,"i":"7"},
  {"x":3,"y":1,"w":1,"h":1,"i":"8"},
  {"x":4,"y":1,"w":1,"h":1,"i":"9"},
];

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

export default {
  name: 'Layout',
  components: {
    GridLayout,
    GridItem,
  },
  data () {
    return {
      layout: testLayout,
      newX:0,
      newY:0,
      curBox:'',
    }
  },
  mounted () {

  },
  methods:{

    watchitem:function(item) {
      //if(item.y>y_max ||item.x>x_max){
      //item.y=
      //item.x=
      //}
      //如果不是当前移动的 使其位置保持不变
      if(this.curBox != item.i) {
        for (let j = 0;historyLayout[j] != undefined; j++) {
          if(historyLayout[j].i == item.i) {
            item.x = historyLayout[j].x
            item.y = historyLayout[j].y
          }
        }
      }
      return item
    },
    toChangePosition:function(i){
      let layout = this.layout
      let hisLayout = historyLayout
      for (let j = 0; j < layout.length; j++) {
        if(layout[j].i == i) {
          let item = layout[j]
          for (let k = 0; k<hisLayout.length;k++) {
            if(hisLayout[k].i == i ) {
              let hisItem = hisLayout[k]
              let beforeX = hisItem.x
              let beforeY = hisItem.y
              let afterX = item.x
              let afterY = item.y
              for (let l = 0; l < hisLayout.length; l++) {
                if(hisLayout[l].i != i) {
                  let needMoveobj = hisLayout[l]
                  //可能写的看上去比较繁琐  肯定有更优的写法
                  if(afterY == beforeY && needMoveobj.y == beforeY &&
                      ((needMoveobj.x >= item.x  && needMoveobj.x <= beforeX) || (needMoveobj.x <= item.x  && needMoveobj.x >= beforeX))) {
                    if(item.x > beforeX) {
                      needMoveobj.x = needMoveobj.x - 1
                    } else {
                      needMoveobj.x = needMoveobj.x + 1
                    }
                  }else if((beforeY == 1 && afterY == 0) && ((needMoveobj.y == beforeY && needMoveobj.x < beforeX) || (needMoveobj.y == afterY && needMoveobj.x >= afterX))) {
                    needMoveobj.x = needMoveobj.x +1
                    if(needMoveobj.x > 4) {
                      needMoveobj.x = 0
                      needMoveobj.y = needMoveobj.y +1
                    }
                  }else if((beforeY == 0 && afterY==1) && ((needMoveobj.y == beforeY && needMoveobj.x > beforeX) || (needMoveobj.y == afterY && needMoveobj.x <= afterX))) {
                    needMoveobj.x = needMoveobj.x - 1
                    if(needMoveobj.x <0) {
                      needMoveobj.x = 4
                      needMoveobj.y = needMoveobj.y - 1
                    }
                  }
                }
              }
              hisItem.x = item.x
              hisItem.y = item.y
            }
          }
        }
      }
    },

    moveEvent: function(i, newX, newY,e){
      this.curBox = i
      //console.log(e)
      //console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    movedEvent: function(i, newX, newY,e){
      this.toChangePosition(i)
      //console.log(e)
      //console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-grid-layout {
  position: relative;
  width:800px;
  height:450px;
  /*overflow: hidden;*/
}
.vue-grid-layout>div {
  position: absolute;
  background: indianred;
}
</style>
