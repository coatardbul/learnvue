<template>
  <div id="container"></div>

</template>

<script setup>
import {Graph} from '@antv/x6';
import {onMounted, reactive, ref} from "vue";



const data = ref({
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 80,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      ports: {
        groups: {
          group1: {
            position: 'left',    // 链接桩位置
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
              },
            },
          },
          group2: {
            position: 'right',    // 链接桩位置
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
              },
            },
          },
        },
        items: [
          { id: 'port1', group: 'group1' },
          { id: 'port2', group: 'group1' },
          { id: 'port3', group: 'group1' },
          { id: 'port11', group: 'group2' },
          { id: 'port22', group: 'group2' },
          { id: 'port33', group: 'group2' },
        ],
      },
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 180,   // Number，可选，节点大小的 width 值
      height: 100,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
      ports: {
        groups: {
          group1: {
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
              },
            },
          },
        },
        items: [
          { id: 'port4', group: 'group1' },
          { id: 'port5', group: 'group1' },
          { id: 'port6', group: 'group1' },
        ],
      },
    },
  ],
  // 边
  edges: [
    {
      source: { cell: 'node1', port: 'port1' }, // String，必须，起始节点 id
      target: { cell: 'node2', port: 'port5' }, // String，必须，目标节点 id
    },
  ],
})

onMounted(() => {
  const graph = new Graph({
    container: document.getElementById('container'),
    width: 1800,
    height: 800,
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  });
  graph.fromJSON(data.value)

})
</script>

<style scoped>

</style>
