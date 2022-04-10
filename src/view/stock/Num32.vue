<template>
  <div class="layout">
    <grid-layout
        v-model:layout="layout"
        :col-num="colNum"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="verticalCompact"
        :margin="[10, 10]"
        :use-css-transforms="false"
        class="hoverStyle">
      <grid-item v-for="item in layout" :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 style="border: 1px solid #fff">
        {{item.i}}
      </grid-item>
    </grid-layout>

    <button @click="layoutGridItem">点击</button>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data(){
    return {
      layout: [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
        {"x":4,"y":0,"w":2,"h":5,"i":"2"},
      ],
      verticalCompact: true,
      colNum: 12 //栅格数
    }
  },
  methods: {

    layoutGridItem(){
      //出入的是对象
      // let config = {
      //     i: 0,
      //     sizeObj: {
      //         w: 2,
      //         h: 5
      //     },
      //     positionObj: {
      //         x: 2,
      //         y: 4
      //     }
      // }

      let config = [{
        i: 0,
        sizeObj: {
          w: 2,
          h: 5
        },
        positionObj: {
          x: 2,
          y: 4
        },
      },{
        i: 2,
        sizeObj: {
          w: 2,
          h: 5
        },
        positionObj: {
          x: 2,
          y: 4
        }
      }]

      //判断传入的参数是对象,还是数组
      if(Object.prototype.toString.call(config) == "[object Object]") {
        //校验参数
        try{
          let xString = config.positionObj.x + ""
          let wString = config.sizeObj.w + ""

          //判断传入的参数是否是小数
          if(xString.includes(".") || wString.includes(".")) {
            throw new Error("x 与 w参数不能是小数")
          }

          //判断x与w的和是否大于栅格数
          if(config.positionObj.x + config.sizeObj.w > this.colNum) {
            throw new Error("x 与 w之和不能大于栅格数")
          }
        }catch(e) {
          console.log(e)
          return
        }

        //设置新的布局格式
        this.verticalCompact = false
        this.layout.forEach(item => {
          if(item.i == config.i) {
            item.h = config.sizeObj.h
            item.w = config.sizeObj.w
            item.x = config.positionObj.x
            item.y = config.positionObj.y
            console.log(item.x,item.y,item.h,item.w)
          }
        })
      }

      if(Object.prototype.toString.call(config) == "[object Array]") {
        //校验参数
        try{
          config.forEach(_ => {
            let xString = _.positionObj.x + ""
            let wString = _.sizeObj.w + ""

            //判断传入的参数是否是小数
            if(xString.includes(".") || wString.includes(".")) {
              throw new Error("x 与 w参数不能是小数")
            }

            //判断x与w的和是否大于栅格数
            if(_.positionObj.x + _.sizeObj.w > this.colNum) {
              throw new Error("x 与 w之和不能大于栅格数")
            }
          })
        }
        catch(e) {
          console.log(e)
          return
        }

        this.verticalCompact = false
        this.layout.forEach(item => {
          config.forEach(_ => {
            if(item.i == _.i) {
              item.h = _.sizeObj.h
              item.w = _.sizeObj.w
              item.x = _.positionObj.x
              item.y = _.positionObj.y
              console.log(item.x,item.y,item.h,item.w)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
.layout {
  background: #999;
  height: 500px;
}
.hoverStyle {
  border: 1px solid #999;
  // &:hover {
  //     border: 1px solid blue;
  // }
}
</style>
