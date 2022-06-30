<template>

  <el-button @click="addContentEvent">新建文件夹</el-button>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item @click="getAllInfo">主页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ secondUrl }}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :http-request="uploadFile"
      :file-list="fileList"
  >

    <el-icon>
      <Plus/>
    </el-icon>
    <template #file="{ file }">
      <div v-if="file.fileType==2">
        <el-image class="el-upload-list__item-thumbnail" :src="file.url" fit="cover" style="width: 100%;height: 145px"/>
        <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><Download/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete/></el-icon>
          </span>
        </span>
      </div>

      <div v-else>
        <div>
           <span @click="getUpdateInfo(file.fileName)">{{ file.fileName }}
        </span>
        </div>
        <el-button @click="removeFolder(file)">删除</el-button>
        <div>

        <span
            class="el-upload-list__item-delete"
            @click="removeFolder(file)"
        >
            <el-icon><Delete/></el-icon>
          </span>
        </div>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="fileDialogVisible">
    <el-form>
      <el-form-item label="文件夹名称">
        <el-input v-model="contentName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="fileDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addFolder"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible">
    <el-image :src="dialogImageUrl" :preview-src-list="srcList" fit="cover"/>
  </el-dialog>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import axios from "axios";
import AxiosUrl from "@/constant/AxiosUrl";

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileDialogVisible = ref(false)
const fileList = ref([])

const secondUrl = ref()

const contentName = ref()


function addFolder() {
  axios.post(AxiosUrl.stock.file.mkdir, {
    path: contentName.value,
  });
  fileDialogVisible.value = false;
  setTimeout(() => {
    getUpdateInfo('');
  }, 2000);
}

function addContentEvent() {
  fileDialogVisible.value = true;
}

function uploadFile(file) {
  let param = new FormData()       // 创建form对象
  param.append('file', file.file)       // 通过append向form对象添加数据
  param.append('path', secondUrl.value)       // 通过append向form对象添加数据
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  axios.post(AxiosUrl.stock.file.upload, param, config).then((res) => {
  });
  setTimeout(() => {
    getUpdateInfo(secondUrl.value);
  }, 2000);

}

const srcList = computed(() => {
  let urlList = []
  fileList.value.forEach(item => {
    urlList.push(item.url);
  })
  return urlList;
})

function handleRemove(uploadFile) {
  axios.post(AxiosUrl.stock.file.delete, {
    path: uploadFile.filePath,
    fileName: uploadFile.fileName,
  });
  setTimeout(() => {
    getUpdateInfo(uploadFile.filePath);
  }, 2000);
}

function removeFolder(uploadFile) {
  axios.post(AxiosUrl.stock.file.deleteFolder, {
    path: uploadFile.filePath,
    fileName: uploadFile.fileName,
  });
  setTimeout(() => {
    getUpdateInfo(uploadFile.filePath);
  }, 2000);
}


function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true
}


function getUpdateInfo(path) {
  secondUrl.value = path;
  fileList.value.length = 0;
  axios.post(AxiosUrl.stock.file.getHeadList, {
    path: path,
    fileName: '',
  }).then((res) => {
    fileList.value = res;
  });
}

function getAllInfo() {
  secondUrl.value = '';
  fileList.value.length = 0;
  axios.post(AxiosUrl.stock.file.getHeadList, {
    path: '',
    fileName: '',
  }).then((res) => {
    fileList.value = res;
  });
}

onMounted(() => {
  getAllInfo();
})
</script>

<style scoped>

</style>
