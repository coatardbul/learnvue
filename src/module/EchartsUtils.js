export default {


    clearCache(baseLineEcharts) {
        baseLineEcharts.series.length = 0;
        baseLineEcharts.xAxis[0].data.length= 0;
        baseLineEcharts.dataset.length = 0;
        baseLineEcharts.visualMap.length = 0;
    },


}
