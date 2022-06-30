import Vue, { createApp } from 'vue';

import 'element-plus/dist/index.css'


// 引入 ElementUI
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import App from '@/App.vue';
import router from '@/config/router';
import global from '@/util/global'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axiosTemp from './config/axios';

import axios from 'axios'
import VueAxios from 'vue-axios'

import sb from '@/js/base'

import JsonExcel from "vue-json-excel";

const app = createApp(App)
//挂载到Vue实例上面
app.config.globalProperties.$global = global

app.config.globalProperties.$http = axiosTemp
app.use(router)
app.use(VueAxios,axios)
app.use(ElementPlus,{locale:zhCn});
app.use(JsonExcel)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');
