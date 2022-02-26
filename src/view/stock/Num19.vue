<template>
  <BaseLineChartNew
      :base-line-echarts="baseLineEcharts"
      :char-style="charStyle"
      :key="time"
  ></BaseLineChartNew>
</template>

<script>
import BaseLineChartNew from "@/components/BaseLineChartNew";
import {reactive, onMounted, ref} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import ConfigInfo from "@/constant/ConfigInfo";
import Xaxis from "@/module/Xaxis";
import YleftAxis from "@/module/YleftAxis";

export default {
  components: {
    BaseLineChartNew
  },
  props: {
    beginDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
    charStyle: {
      type: Object,
      default: function () {
        return {width: '50%', height: '3600px'}
      }
    }
  },
  setup(props, context) {
    //初始化参数
const time =ref()
    const baseLineEcharts = reactive({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all'
          }
        ]
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {onZero: true},
          data: []
        }
      ],
      yAxis: [
        {
          name: 'Evaporation(m^3/s)',
          type: 'value',
        },
      ],
      series: [],
      grid: [
        {
          left: 60,
          right: 50,
          height: '100'
        },
        {
          left: 60,
          right: 50,
          top: '200',
          height: '100'
        },
        {
          left: 60,
          right: 50,
          top: '400',
          height: '100'
        },
        {
          left: 60,
          right: 50,
          top: '600',
          height: '100'
        }
      ],


    })

    function getAllStockInfoByDate() {

      // setGrid(baseLineEcharts, 100);

      axios.post(AxiosUrl.stock.stockDayStatic.getRangeStatic, {
        beginDateStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        endDateStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
        objectEnumSign: props.queryParam == null || props.queryParam.objectSign.length == 0 ? ConfigInfo.emotionInfo.defaultDayObjectSign : props.queryParam.objectSign,
      }).then((res) => {
        if (res == null) {
          return
        }
        if (res.length > 0) {
          let nameArray = []
          res.forEach((v) => {
            baseLineEcharts.xAxis[0].data.push(v.date)
            JSON.parse(v.objectStaticArray).forEach(c => {
              if (nameArray.findIndex(t => t === c.name) < 0) {
                nameArray.push(c.name)
              }
            })
            //todo 判断是否包含名称，动态显示
          })
          nameArray.forEach(v => {
            let seriesIndex = {
              name: v,
              type: 'line',
              data: []
            }
            res.forEach(c => {
              JSON.parse(c.objectStaticArray).forEach(b => {
                if (v === b.name) {
                  //坐标轴
                  if (v.indexOf("跌停") >= 0) {

                  }
                  if (v.indexOf("炸板") >= 0 || v.indexOf("涨停") >= 0) {
                    seriesIndex.xAxisIndex = 1;
                    seriesIndex.yAxisIndex = 1;
                  }
                  if (v.indexOf("adjs") >= 0) {
                    seriesIndex.xAxisIndex = 2;
                    seriesIndex.yAxisIndex = 2;
                  }
                  if (v.indexOf("连涨") >= 0) {
                    seriesIndex.xAxisIndex = 3;
                    seriesIndex.yAxisIndex = 3;
                  }

                  if (v.indexOf("跌停") >= 0 || v.indexOf("未回封") >= 0) {
                    seriesIndex.data.push(0 - b.value)
                  } else {
                    seriesIndex.data.push(b.value)
                  }
                }
              })
            })
            baseLineEcharts.series.push(seriesIndex);
          })
        }



        for (let i = 1; i < 4; i++) {
          let data = baseLineEcharts.xAxis[0].data;
          let xaxis = {

            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: true},
            data: []

          };
          xaxis.gridIndex = i;
          xaxis.data = data;
          baseLineEcharts.xAxis.push(xaxis);
        }

        for (let i = 1; i < 4; i++) {
          let yleftAxis = {
            name: 'Evaporation(m^3/s)',
            type: 'value',
          }
          yleftAxis.gridIndex = i;
          baseLineEcharts.yAxis.push(yleftAxis);
        }

        time.value=new Date().getTime()

      });
    }


    function setGrid(baseLineEcharts, num) {
      baseLineEcharts.grid.length = 0;
      for (let i = 0; i < 4; i++) {
        let sb = {
          left: 60,
          right: 50,
          height: '100'
        }
        sb.top = 2 * (i + 1) * num + 'px';
        baseLineEcharts.grid.push(sb);
      }

    }


    function clearCache() {
      baseLineEcharts.series.length = 0
    }

    onMounted(() => {
      clearCache();
      getAllStockInfoByDate()
    })
    return {
      baseLineEcharts, getAllStockInfoByDate,time
    }
  }
}
</script>

<style scoped>

</style>
