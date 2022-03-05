<template>
  <BaseLineChartNew
      :base-line-echarts="baseLineEcharts"
      :char-style="charStyle"
      v-if=" baseLineEcharts.series.length>0"
  ></BaseLineChartNew>
</template>

<script>
import BaseLineChartNew from "@/components/BaseLineChartNew";
import {reactive, onMounted} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import BaseEcharts from "@/module/BaseEcharts";
import EchartsUtils from "@/module/EchartsUtils";
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
        return {width: '100%', height: '1000px'}
      }
    }
  },
  setup(props, context) {
    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))


    function getAllStockInfoByDate() {
      axios.post(AxiosUrl.stock.marketValueScatterStatic.getRangeStatic, {
        dateBeginStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        dateEndStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
        objectEnumSign: 'day_call_auction_statistic'
      }).then((res) => {

        let dataset = []
        res.forEach(item => {
          baseLineEcharts.xAxis[0].data.push(item.date);
          JSON.parse(item.objectStaticArray).forEach(v => {
                let dataIndex = [];
                dataIndex.push(item.date);
                dataIndex.push(v.compareIncreaseRange)
                dataIndex.push(v.increaseRange)
                dataIndex.push(v.marketValue);
                dataIndex.push(v.code);
                dataIndex.push(v.name);
                dataIndex.push(v.compareTradeMoney);
                dataIndex.push(v.tradeMoney);
                dataIndex.push(v.compareTurnoverRate);
                dataIndex.push(v.turnoverRate);
                dataIndex.push(v.callAuctionRatio)
                dataset.push(dataIndex);
              }
          )
        })
        let serviceIndex = {
          name: '市值',
          type: 'scatter',
          itemStyle: {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(196,46,46,0.3)'
          },
          data: dataset
        }
        baseLineEcharts.series.push(serviceIndex);
        let datasetSourceIndex = {
          source: dataset
        }
        baseLineEcharts.dataset.push(datasetSourceIndex);
      });
    }
    function clearSlotCache() {
      baseLineEcharts.axisPointer = {}
    }
    function firstInit() {

      setTooltip()

      setVisualMap();

      setYaxis();


    }
    function setTooltip() {
      const schema = [
        {name: 'date', index: 0, text: '日'},
        {name: '集合竞价涨幅', index: 1, text: '集合竞价涨幅'},
        {name: '上一交易日集合竞价涨幅', index: 2, text: '上一交易日集合竞价涨幅'},
        {name: '市值', index: 3, text: '市值'},
        {name: '股票代码', index: 4, text: '股票代码'},
        {name: '股票名称', index: 5, text: '股票名称'},
        {name: '交易金额', index: 6, text: '交易金额'},
        {name: '上一交易日交易金额', index: 7, text: '上一交易日交易金额'},
        {name: '换手率', index: 8, text: '换手率'},
        {name: '上一交易日换手率', index: 9, text: '上一交易日换手率'},
        {name: '竞价金额与上一日对比比率', index: 10, text: '竞价金额与上一日对比比率'},
      ];
      baseLineEcharts.tooltip = {
        backgroundColor: 'rgb(234,198,179)',
        formatter: function (param) {
          var value = param.value;
          // prettier-ignore
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
              + value[0] + '日：'
              + '</div>'
              + schema[1].text + '：' + (value[1] ).toFixed(2) + '%' + '<br>'
              + schema[2].text + '：' + (value[2] ).toFixed(2) + '%' + '<br>'
              + schema[3].text + '：' + (value[3] / 10000 / 10000).toFixed(2) + '亿' + '<br>'
              + schema[4].text + '：' + value[4] + '<br>'
              + schema[5].text + '：' + value[5] + '<br>'
              + schema[6].text + '：' + (value[6] / 10000 / 10000).toFixed(2) + '亿' + '<br>'
              + schema[7].text + '：' + (value[7] / 10000 / 10000).toFixed(2) + '亿' + '<br>'
              + schema[8].text + '：' + (value[8] ).toFixed(2) + '%' + '<br>'
              + schema[9].text + '：' + (value[9] ).toFixed(2) + '%' + '<br>'
              + schema[10].text + '：' + value[10].toFixed(2) + '%' + '<br>';
        }
      }

    }

    function setVisualMap() {
      let visio = {
        left: 'right',
        top: '20%',
        dimension: 10,
        min: 0,
        max: 35,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        text: ['与上一日交易金额比率'],
        // hoverLink:true,
        textGap: 30,
        inRange: {
          symbolSize: [4, 45],
        },
        outOfRange: {
          symbolSize: [10, 70],
          color: ['rgba(255,255,255,0.65)']
        },
        // controller: {
        //   inRange: {
        //     color: ['#c23531']
        //   },
        //   outOfRange: {
        //     color: ['#999']
        //   }
        // }
      };

      baseLineEcharts.visualMap.push(visio);

    }

    function setYaxis() {
      let yAxisIndex1 = {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
          }
        },
        axisLabel: {
          formatter: function (value, index) {
            return value + '---';
          }
        },
      }

      baseLineEcharts.yAxis = [];
      baseLineEcharts.yAxis.push(yAxisIndex1);
    }


    onMounted(() => {
      EchartsUtils.clearCache(baseLineEcharts);
      clearSlotCache();
      firstInit();
      getAllStockInfoByDate()

    })
    return {
      baseLineEcharts, getAllStockInfoByDate
    }
  }
}
</script>

<style scoped>

</style>
