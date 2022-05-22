<template>
  <div :style="{width:'100%',height:'800px'}" id="container"></div>

</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {

  var map = new BMapGL.Map('container');
  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);
  map.enableScrollWheelZoom(true);
  var cr = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(200, 60)
  });   //设置版权控件位置
  map.addControl(cr); //添加版权控件
  var bs = map.getBounds();   //返回地图可视区域
  cr.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655366862&t=eae27ea2158b8df387a2dcca6205dcf4' width='200px' height='300px'/>",
    bounds: bs
  });
  var cr1 = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(300, 120)
  });   //设置版权控件位置
  map.addControl(cr1); //添加版权控件
  var bs1 = map.getBounds();   //返回地图可视区域
  cr1.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367222&t=8c1601f0e8a80204c5b07c9da621bab4' width='200px' height='200px'/>",
    bounds: bs
  });
  var cr2 = new BMapGL.CopyrightControl({
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    offset: new BMapGL.Size(1000, 400)
  });   //设置版权控件位置
  map.addControl(cr2); //添加版权控件
  var bs2 = map.getBounds();   //返回地图可视区域
  cr2.addCopyright({
    id: 1,
    content: "<img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242312005c1-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655366862&t=3763b0f4285413f75547ee576becbcf3' width='200px' height='200px'/>",
    bounds: bs
  });




  var data = [];

  var citys = [
    '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨',
    '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州',
    '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐',
    '成都', '贵阳', '昆明', '拉萨', '海口'
  ];
  var markers = [
    'images/marker.png',
    'images/icons/icon-accident.png',
    'images/icons/icon-airplane.png',
    'images/icons/icon-location.png',
    'images/icons/label-accident.png',
    'images/icons/label-jam.png',
    'images/icons/label-warning.png',
  ];

  var randomCount = 100;

  // 构造数据
  while (randomCount--) {
    var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
    data.push({
      geometry: {
        type: 'Point',
        coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
      },
      // properties: {
      //     icon: markers[Math.floor(Math.random() * markers.length)]
      // }
    });
  }

  var view = new mapvgl.View({
    map: map
  });

  var layer = new mapvgl.IconLayer({
    width: 100 / 4,
    height: 153 / 4,
    offset: [0, -153 / 8],
    opacity: 0.8,
    icon: 'images/marker.png',
    enablePicked: true, // 是否可以拾取
    selectedIndex: -1, // 选中项
    selectedColor: '#ff0000', // 选中项颜色
    autoSelect: true, // 根据鼠标位置来自动设置选中项
    onClick: (e) => { // 点击事件
      console.log('click', e);
    },
    onDblClick: e => {
      console.log('double click', e);
    },
    onRightClick: e => {
      console.log('right click', e);
    }
  });
  view.addLayer(layer);
  layer.setData(data);

  map.setDefaultCursor('default');





})
</script>
