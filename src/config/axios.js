import axios from "axios";
import qs from "qs";
import { ElMessage } from 'element-plus'

// axios.defaults.baseURL = ''  //正式
// axios.defaults.baseURL = 'api/river' //测试
//post请求头
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 60*1000;

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if(response.config.url.indexOf("/downLoadFile")>-1){
            debugger
            return Promise.resolve(response.data);
        }
        if (response.status == 200) {
            //对参数统一处理
            if(response.data &&response.data.code==200){
                return Promise.resolve(response.data.data);
            }else {
                ElMessage.error(response.data.message)
                return Promise.reject(response.data.message);
            }
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        ElMessage.error(`异常请求：${JSON.stringify(error.message)}`)
    }
);
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {

            axios({
                method: 'post',
                url,
                data: qs.stringify(data),
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data,
            })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};


