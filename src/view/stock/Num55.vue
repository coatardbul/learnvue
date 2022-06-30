<template>

  <div @click="downloadFile">sssssss</div>

  <div style="width: 1200px  ; height: 300px;background-color: #ce1121" ref="sdfs">


  </div>
</template>

<script setup>

import axios from "axios";

import {ref} from "vue";

const sdfs=ref()

function downloadFile() {


  axios({
    method: 'POST',
    headers: {  },
    url: `/stock/fileTest/downLoadFile`,
    params: { },
    responseType: 'blob' // 更改responseType类型为 blob
  }).then(res => {
    let blob = new Blob([res], {type: 'application/octet-stream;charset=UTF-8'}
    )
    console.log(blob)
    let fileName = Date.parse(new Date()) + '.docx'
    if (window.navigator.msSaveOrOpenBlob) {
      // console.log(2)
      navigator.msSaveBlob(blob, fileName)
    } else {
      // console.log(3)
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      //释放内存
      window.URL.revokeObjectURL(link.href)

    }



  //   renderAsync(buffer,sdfs.value , null,
  //        {
  //     className:  "docx", // 默认和文档样式类的类名/前缀
  //         inWrapper:  true, // 启用围绕文档内容渲染包装器
  //         ignoreWidth:  false, // 禁止页面渲染宽度
  //         ignoreHeight:  false, // 禁止页面渲染高度
  //         ignoreFonts:  false, // 禁止字体渲染
  //         breakPages:  true, // 在分页符上启用分页
  //         ignoreLastRenderedPageBreak:  true,//禁用lastRenderedPageBreak元素的分页
  //         experimental:  false, //启用实验性功能（制表符停止计算）
  //         trimXmlDeclaration:  true, //如果为真，xml声明将在解析之前从xml文档中删除
  //         debug:  false, // 启用额外的日志记录
  //   }
  // );





  }).catch(err => {
    console.log(err)
  })







  // axios.post("/stock/fileTest/downLoadFile",{
  //   headers: { Accept: "application/Json" },responseType: "blob",}).then((res) => {
  //
  //   debugger
  //   // const binaryData = []
  //   // binaryData.push(res)// res 后台返回的流数据
  //   // this.pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/octet-stream;charset=utf-8' }))
  //   // window.open(this.pdfUrl)
  //
  //   let blob = new Blob([res], {type: 'application/pdf;charset=UTF-8'}
  //   )
  //   console.log(blob)
  //   let fileName = Date.parse(new Date()) + '.pdf'
  //   if (window.navigator.msSaveOrOpenBlob) {
  //     // console.log(2)
  //     navigator.msSaveBlob(blob, fileName)
  //   } else {
  //     // console.log(3)
  //     var link = document.createElement('a')
  //     link.href = window.URL.createObjectURL(blob)
  //     link.download = fileName
  //     link.click()
  //     //释放内存
  //     window.URL.revokeObjectURL(link.href)
  //
  //   }
  //
  //
  // });
}


// function downloadFiles(data, filename) {
//   //接收的是blob，若接收的是文件流，需要转化一下
//   //var blob = new Blob([data])
//   if (typeof window.chrome !== 'undefined') {
//     // Chrome version
//     var link = document.createElement('a');
//     link.href = window.URL.createObjectURL(data);
//     link.download = filename;
//     link.click();
//   } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
//     // IE version
//     var blob = new Blob([data], {type: 'application/force-download'});
//     window.navigator.msSaveBlob(blob, filename);
//   } else {
//     // Firefox version
//     var file = new File([data], filename, {type: 'application/force-download'});
//     window.open(URL.createObjectURL(file));
//   }
// }

</script>

<style scoped>

</style>
