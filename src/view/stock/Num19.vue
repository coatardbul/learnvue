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
    const baseLineEcharts = reactive(new BaseLineEcharts())


    function getAllStockInfoByDate() {
      axios.post(AxiosUrl.stock.marketValueScatterStatic.getRangeStatic, {
        dateBeginStr: props.beginDate == null || props.beginDate.length === 0 ? '2022-01-01' : props.beginDate,
        dateEndStr: props.endDate == null || props.endDate.length === 0 ? '2022-12-31' : props.endDate,
        objectEnumSign: 'day_market_Value_statistic'
      }).then((res) => {
        let serviceIndex = {
          name: '市值',
          type: 'scatter',
          itemStyle: {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(196,46,46,0.3)'
          }
        }
        baseLineEcharts.series.push(serviceIndex);
        let dataset = []
        res.forEach(item => {
          baseLineEcharts.xAxis[0].data.push(item.date);
          JSON.parse(item.objectStaticArray).forEach(v => {
                let dataIndex = [];
                dataIndex.push(item.date);
                dataIndex.push(v.marketValue);
                dataIndex.push(v.code);
                dataIndex.push(v.name);
                dataIndex.push(v.tradeMoney);
                dataIndex.push(v.turnoverRate);
                dataset.push(dataIndex);
              }
          )
        })
        let datasetSourceIndex = {
          source: dataset
        }
        baseLineEcharts.dataset.push(datasetSourceIndex);

        baseLineEcharts.yAxis = {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }
        console.log([].toString());
      });

    }

    function clearCache() {
      baseLineEcharts.series.length = 0
      baseLineEcharts.dataset.length = 0
      baseLineEcharts.axisPointer = {}
      baseLineEcharts.visualMap.length = 0
      const schema = [
        {name: 'date', index: 0, text: '日'},
        {name: 'AQIindex', index: 1, text: '市值'},
        {name: 'PM25', index: 2, text: '股票代码'},
        {name: 'PM10', index: 3, text: '股票名称'},
        {name: 'CO', index: 4, text: '交易金额'},
        {name: 'NO2', index: 5, text: '换手率'},
      ];
      baseLineEcharts.tooltip = {
        backgroundColor: 'rgba(255,255,255,0.7)',
        formatter: function (param) {
          var value = param.value;
          // prettier-ignore
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
              + value[0] + '日：'
              + '</div>'
              + schema[1].text + '：' + value[1] + '<br>'
              + schema[2].text + '：' + value[2] + '<br>'
              + schema[3].text + '：' + value[3] + '<br>'
              + schema[4].text + '：' + value[4] + '<br>'
              + schema[5].text + '：' + value[5] + '<br>';
        }
      }
      let visio = {
        left: 'right',
        top: '10%',
        dimension: 4,
        min: 100000000,
        max: 11100000000,
        itemWidth: 30,
        itemHeight: 120,
        calculable: true,
        precision: 0.1,
        text: ['圆形大小：PM2.5'],
        textGap: 30,
        inRange: {
          symbolSize: [10, 70]
        },
        outOfRange: {
          symbolSize: [10, 70],
        },
        controller: {
          inRange: {
            color: ['#c23531']
          },
          outOfRange: {
            color: ['#999']
          }
        }
      };

      let visio1=    {
        left: 'right',
        bottom: '5%',
        dimension: 6,
        min: 0,
        max: 50,
        itemHeight: 120,
        text: ['明暗：二氧化硫'],
        textGap: 30,
        inRange: {
          colorLightness: [0.9, 0.5]
        },
        outOfRange: {
          color: ['rgba(255,255,255,0.4)']
        },
        controller: {
          inRange: {
            color: ['#c23531']
          },
          outOfRange: {
            color: ['#999']
          }
        }
      }
      baseLineEcharts.visualMap.push(visio);
      baseLineEcharts.visualMap.push(visio1);


    }

    onMounted(() => {
      clearCache();

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
