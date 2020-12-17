const log = console.log.bind(console)
import vue from 'vue'
import axios from 'axios';
import loading from '@/components/request_loading_html/loading'

var start_loading = function() {
    loading.show('Blog is Getting...', true)
}
var end_loading = function() {
    loading.close(false)

}
axios.interceptors.request.use(config => {
    log('config', config)
        //加载动画
    start_loading();

    return config;

}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    end_loading();
    return response;

}, error => {
    end_loading();

    return Promise.reject(error);
})




// 线上配置
let env = process.env;
let proBaseUrl = '';
if (env.NODE_ENV == "development") {
    // 开发模式
    proBaseUrl = ' /api'
    log(env)
} else {
    // 线上模式
    // proBaseUrl = 'https://www.catvue.xyz/api/'
}
axios.baseUrl = proBaseUrl;
export default axios;