<template>
  <BaseLineChart
      :base-line-echarts="baseLineEcharts"
      :char-style="charStyle"
      v-if=" baseLineEcharts.series.length>0"
  ></BaseLineChart>
</template>

<script>
import BaseLineChart from "@/components/BaseLineChart";
import {reactive, onMounted} from "vue";
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";
import BaseLineEcharts from "@/module/BaseLineEcharts";
import BaseEcharts from "@/module/BaseEcharts";
import EchartsUtils from "@/module/EchartsUtils";
import ConfigInfo from "@/constant/ConfigInfo";
import YleftAxis from "@/module/YleftAxis";

export default {
  components: {
    BaseLineChart
  },
  props: {

    charStyle: {
      type: Object,
      default: function () {
        return {width: '100%', height: '500px'}
      }
    },
    queryParam: {
      type: Object,
    },
  },
  setup(props, context) {
    const baseLineEcharts = reactive(Object.assign(new BaseEcharts(), new BaseLineEcharts()))


    function getAllStockInfoByDate() {

      let intervalTimeArr = []
      axios.post(AxiosUrl.river.intervalTime.getTimeList, {
        intervalType: 1
      }).then((res) => {
        res.forEach(v => {
          intervalTimeArr.push(v);
          baseLineEcharts.xAxis[0].data.push(v);
        })
        axios.post(AxiosUrl.stock.stockQuery.strategy, {
          dateStr: props.queryParam == null || props.queryParam.dateStr == null || props.queryParam.dateStr.length === 0 ? ConfigInfo.nowDate : props.queryParam.dateStr,
          riverStockTemplateSign: 'FIRST_UP_LIMIT_EQUAL_ABOVE',
        }).then((res) => {
          let allSeries = [];
          res.data.forEach(v => {
            let dataIndex = [];
            dataIndex.push(v.首次涨停时间.substr(0, 5));
            dataIndex.push(v.首次涨停时间.substr(6, 2));
            dataIndex.push(v.code);
            dataIndex.push(v.股票简称);
            allSeries.push(dataIndex);
          })
          let serviceIndex = {
            type: 'scatter',
            label: {
              normal: {
                //标签位置
                position: 'inside',
                //是否显示标签
                show: true,
                align: 'center',
                width: 18,
                overflow: 'break',
                formatter: function (params) {
                  return params.data[3];
                },
                borderColor: '#555',
                shadowColor: '#888',
                textBorderColor: '#000',

                backgroundColor: '#eee',
                fontSize: 18,
                color: 'rgba(234,8,8,0.86)'
              }
            },
            itemStyle: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(196,46,46,0.3)'
            },
            data: allSeries
          }
          baseLineEcharts.series.push(serviceIndex);


        });
      });
    }

    function clearSlotCache() {
      baseLineEcharts.axisPointer = {}
    }

    function firstInit() {

      setTooltip()


      setYaxis();


    }

    function setTooltip() {
      const schema = [
        {name: '时间', index: 0, text: '时间'},
        {name: '秒', index: 1, text: '秒'},
        {name: '股票代码', index: 2, text: '股票代码'},
        {name: '股票名称', index: 3, text: '股票名称'},
        {name: '模板id', index: 4, text: '模板id'},
        {name: '模板名称', index: 5, text: '模板名称'},
      ];
      baseLineEcharts.tooltip = {
        backgroundColor: 'rgb(234,198,179)',
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
