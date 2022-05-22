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
    queryParam:{
      type:Object,
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
        axios.post(AxiosUrl.stock.stockWarnLog.findAll, {
          dateStr: props.queryParam== null ||  props.queryParam.dateStr== null||props.queryParam.dateStr.length === 0 ? ConfigInfo.nowDate : props.queryParam.dateStr,
        }).then((res) => {
          let nameMap=new Map();
          res.forEach(v => {
            let dataIndex = [];
            dataIndex.push(ConfigInfo.getTimeStr(v.createTime));
            dataIndex.push(parseInt(ConfigInfo.getSecond(v.createTime)));
            dataIndex.push(v.stockCode);
            dataIndex.push(v.stockName);
            dataIndex.push(v.templateId);
            dataIndex.push(v.templateName);
            if(nameMap.has(v.templateName)){
              nameMap.get(v.templateName).push(dataIndex);
            }else {
              let dataset = [];
              dataset.push(dataIndex);
              nameMap.set(v.templateName,dataset);
            }
          })
          for(let [key,value] of nameMap.entries()){

            let serviceIndex = {
              name: key,
              type: 'scatter',
              label: {
                normal: {
                  position: 'inside',
                  show: true,
                  formatter: function (params){
                    return params.data[3];
                  },
                  backgroundColor: '#eee',
                  fontSize: 15,
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
              data: value
            }
            baseLineEcharts.series.push(serviceIndex);

          }

          // let datasetSourceIndex = {
          //   source: dataset
          // }
          // baseLineEcharts.dataset.push(datasetSourceIndex);
        });
      });
    }
    function clearSlotCache() {
      baseLineEcharts.axisPointer = {}
    }
    function firstInit() {

      setTooltip()

      // setVisualMap();

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
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 19px;padding-bottom: 7px;margin-bottom: 7px">'
              + value[0] + '日：'
              + '</div>'
              + schema[1].text + '：' + value[1] + '<br>'
              + schema[2].text + '：'  + value[2] + '<br>'
              + schema[3].text + '：' + value[3] + '<br>'
              + schema[4].text + '：' + value[4] + '<br>'
              + schema[5].text + '：' + value[5] + '<br>';
        }
      }

    }

    function setVisualMap() {
      let visio = {
        left: 'right',
        top: '20%',
        dimension: 1,
        min: 0,
        max: 60,
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
