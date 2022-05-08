<template>
  <div className="spatialSampling">
    <div id="map_container"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
  },
  mounted() {
    var map = initMap({
      tilt: 50,
      heading: 0,
      center: [106.512432,29.544045],
      zoom: 13,
      style: purpleStyle
    });

    var view = new mapvgl.View({
      map: map
    });
    view.startAnimation();

    fetch('/gl/examples/static/car.csv').then(function (rs) {
      return rs.text();
    }).then(function (csvstr) {
      var dataSet = mapv.csv.getDataSet(csvstr);
      var data = dataSet.get();
      var lineLayer = new mapvgl.LineTripLayer({
        trailLength: 21,
        color: 'rgb(0, 255, 255)'
      });
      view.addLayer(lineLayer);
      lineLayer.setData(data);
      let result = {
        type: 'FeatureCollection',
        features: polygons,
      }
      console.log(JSON.stringify(result));

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
