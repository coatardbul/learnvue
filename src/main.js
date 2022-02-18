import { createApp } from 'vue';

import 'element-plus/dist/index.css'


// 引入 ElementUI
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import App from '@/App.vue';
import router from '@/config/router';


import axiosTemp from './config/axios';

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.config.globalProperties.$http = axiosTemp
app.use(router)
app.use(VueAxios,axios)
app.use(ElementPlus,{locale:zhCn});
app.mount('#app');
