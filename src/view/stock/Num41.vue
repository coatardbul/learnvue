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
      tilt: 80,
      heading: -45.3,
      center: [106.542353, 29.565448],
      zoom: 17
    });

    var view = new mapvgl.View({
      map: map
    });

    fetch('/gl/examples/static/chongqing.json').then(function (rs) {
      return rs.json();
    }).then(function (rs) {
      var data = rs;
      var polygons = [];
      var len = data.length;
      for (var i = 0; i < len; i++) {
        var line = data[i];
        var polygon = [];
        var pt = [line[1] * 512, line[2] * 512];
        for (var j = 3; j < line.length; j += 2) {
          pt[0] += line[j] / 100 / 2;
          pt[1] += line[j + 1] / 100 / 2;
          polygon.push([pt[0], pt[1]]);
        }
        if (Math.random() > 0.5) {
          polygons.push({
            geometry: {
              type: 'Polygon',
              coordinates: [polygon]
            },
            properties: {
              height: line[0] / 2
            }
          });

        }

      }

      var shapeLayer = new mapvgl.ShapeLayer({
        color: 'rgba(194, 147, 75, 0.8)', // 柱状图颜色
        enablePicked: true, // 是否可以拾取
        selectedIndex: -1, // 选中项
        opacity:0.2,
        riseTime:2000,
        selectedColor: '#11ee1c', // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => { // 点击事件
          console.log(e);
        },
      });
      view.addLayer(shapeLayer);

      shapeLayer.setData(polygons);

      map.setDefaultCursor('default');

      /*
      setInterval(() => {
          polygons = polygons.map((item) => {
              item.properties.preHeight = item.properties.height;
              item.properties.height = Math.random() * 100;
              return item;
          });
          shapeLayer.setData(polygons);
      }, 2000);
      */

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
