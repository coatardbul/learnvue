<template>
  <div>
    <div ref="chart" id="main" style="width: 100%;height:700px;"></div>
  </div>
</template>
<script >
import * as echarts from "echarts";
import {ref,onMounted} from "vue";

export default {
  name:'BaseLineChartTemp',
  setup(){
    const chart = ref()
    onMounted(()=>{
      init()
    })
    function init() {
      var myChart = echarts.init(chart.value);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };

      myChart.setOption(option);

    }
    return{
      chart,init,
    }
  }

}

</script>
