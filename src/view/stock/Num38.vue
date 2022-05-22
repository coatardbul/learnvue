<template>
  <div :style="{

  width:'1400px',
  height:'800px',
   backgroundColor:'#ef0d05',
  // backgroundImage: 'url(' + require('/src/assets/jamesLegge/jamesLegge2.jpeg') + ')',
  //
  // backgroundRepeat: 'no-repeat',
  //
  // backgroundSize: '100% 100%'

}" className="spatialSampling">
    <div id="map_container"></div>
  </div>
</template>

<script>
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

export default {
  components: {},
  data() {
    return {};
  },
  created() {
  },
  mounted() {
    var map = initMap({
      tilt: 48.8,
      heading: 0,
      center: [105.348145, 28.165926],
      zoom: 5,
      style: purpleStyle
    });

    var view = new mapvgl.View({
      map: map
    });
    // axios.get('/gl/examples/static/chongqing.json').then((res) => {
    //
    //   beginDate.value = res;
    //   time.value = new Date().getTime();
    // });
    fetch("/gl/examples/data/chinalocation.json")
        .then(rs => {
          return rs.json();
        })
        .then(rs => {

          var data1 = [];
          var data2 = [];
          var data3 = [];
          for (var i = 0; i < rs[0].length; i++) {
            var geoCoord = rs[0][i].geoCoord;
            data1.push({
              geometry: {
                type: "Point",
                coordinates: geoCoord
              },
              properties: {
                time: Math.random() * 100
              }
            });
          }

          for (var i = 0; i < rs[1].length; i++) {
            var geoCoord = rs[1][i].geoCoord;
            data2.push({
              geometry: {
                type: "Point",
                coordinates: geoCoord
              },
              properties: {
                time: Math.random() * 10
              }
            });
          }

          for (var i = 0; i < rs[2].length; i++) {
            var geoCoord = rs[2][i].geoCoord;
            data3.push({
              geometry: {
                type: "Point",
                coordinates: geoCoord
              },
              properties: {
                time: Math.random() * 10
              }
            });
          }

          view.addLayer(
              new mapvgl.PointLayer({
                blend: "lighter",
                shape: "circle",
                color: "rgba(255, 77, 77, 0.8)", // 点图层1颜色
                data: data1,
                size: 1
              })
          );

          view.addLayer(
              new mapvgl.PointLayer({
                blend: "lighter",
                shape: "circle",
                color: "rgba(255, 204, 0, 0.6)", // 点图层2颜色
                data: data2,
                size: 1.5
              })
          );

          view.addLayer(
              new mapvgl.PointLayer({
                blend: "lighter",
                shape: "circle",
                color: "rgba(255, 255, 0, 0.6)", // 点图层3颜色
                data: data3,
                size: 2
              })
          );

          view.addLayer(
              new mapvgl.PointTripLayer({
                blend: "lighter",
                shape: "circle",
                startTime: 0,
                endTime: 100,
                step: 0.1,
                trailLength: 10,
                color: "rgba(255, 255, 153, 0.5)", // 点动画图层颜色
                data: data1,
                size: 1.5
              })
          );
        });
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
.spatialSampling {
  width: 100%;
  height: 800px;
  border: 1px solid red;

  #map_container {
    width: 100%;
    height: 100%;
  }
}
</style>
