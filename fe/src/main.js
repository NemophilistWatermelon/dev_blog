import Vue from 'vue'
import App from './App.vue'


import loading from '@/components/request_loading_html/loading.js'
// 前端路由
import router from './router'
// 博文Api
import blogApi from './lib/api/blogApi/index.js'
// 格式化时间 moment.js
import moment from 'moment';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.prototype.$blogApi = blogApi;
// Vue.use(loading)
Vue.use(ElementUI);
const log = console.log.bind(console)

// 正常 格式日期显示  YY-MM-DD ...
Vue.filter('filter_Time', (timeValue) => {
    var time = timeValue;
    if (typeof time === "string") {
        time = parseInt(time);
    }
    return moment(time).format('YY/MM/DD HH:mm')
})

// 处理时间
const processDate = function(arr) {
        var time = ""
        var firstIndex = arr[0]
        if (firstIndex === "a") {
            firstIndex = "1"
        }

        for (var i = 0; i < arr.length; i++) {
            var t = arr[i]

            if (t == "minutes" || t == "minute") {
                time = firstIndex + "分钟前"
            } else if (t == "month" || t == "months") {
                time = firstIndex + "月前"
            } else if (t == "second" || t == "seconds") {
                time = "刚刚"
            } else if (t == "day" || t == "days") {
                time = firstIndex + "天前"
            }
        }

        return time
    }
    // 几小时之前 指令
Vue.filter('filter_Time_ago', (timeValue) => {
    var time = timeValue;
    if (typeof time === "string") {
        time = parseInt(time);
    }
    // var resultTime = moment(time).startOf("day").fromNow()
    var resultTime = moment(time).fromNow().split(" ");

    return processDate(resultTime)

})
var __main = function() {
    var vm = new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
    window.vm = vm;

}
__main();