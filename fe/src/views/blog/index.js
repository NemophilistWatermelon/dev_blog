// components
// blog 展示页面 banner
import blogImg from "./blogComp/index.vue";
// blog 展示页面 条目
import blogContent from "./blogContent/index.vue";
import blogProfile from "@/components/blogProfile/index.vue";
import blogFoot from "@/components/blogFoot/index.vue";
import err_tip from "@/components/err/index.vue";

const log = console.log.bind(console);
const dir = console.dir.bind(console);

// blog.vue
export default {
    name: "blog",
    data() {
        return {
            blogLimits: null,
            allBlogNum: 0,
            toggleTip: false,
            defaultIndex: 1,
            greaterThanOne: false,
            blogTagShow: false,
            // |- 错误处理属性开始
            errModu: false,
            errVal: '',
            // 错误处理属性结束 —|

        };
    },
    components: {
        // 最上方头部
        blogImg,
        // 博文列表循环体
        blogContent,
        // 中间介绍
        blogProfile,
        // 底部
        blogFoot,
        // 错误提醒
        err_tip,
    },
    created() {
        this.getBlogLimit(1);
        // 监听掉线情况 使用错误处理


    },
    mounted() {
        this.disconnect_Error()
    },
    methods: {
        limitBlog(str, index) {
            this.blogLimits = null;
            switch (str) {
                // 上一页
                case (str = "prev"):
                    index -= 1;
                    this.defaultIndex -= 1;
                    index <= 1 ? (this.greaterThanOne = false) : "";
                    log('p**', index)
                    this.getBlogLimit(index);
                    break;
                    // 下一页
                case (str = "next"):
                    index += 1;
                    this.defaultIndex += 1;
                    index > 1 ? (this.greaterThanOne = true) : "";
                    log('n**', index)

                    this.getBlogLimit(index);
                    break;
                default:
            }
        },
        // 格式化时间
        momentTime(t) {
            var time = t;
            if (typeof time === "string") {
                time = parseInt(t);
            }
            return this.$moment(time).format('YY/MM/DD HH:mm');
        },

        setPage(totalPageNum) {
            this.allBlogNum = totalPageNum;
        },

        blogResultArray(data) {
            data.forEach((ele, index) => {
                // 对返回数据体进行处理
                var t = ele.blogCreateTime;
                ele.id = String(ele.id);
                ele.timeStamp = t;
                ele.blogCreateTime = this.momentTime(t);
                ele.blogCatgory = ele.blogCatgory.split("|");
            });
            return data;
        },

        async getBlogLimit(getNum = 0) {

            let api_data = await this.$blogApi.apiGetBlogLimit(getNum);

            // 处理 非法数据 提示框
            if (this.abort_err(api_data)) {
                this.error_module_tip_show()
                this.errVal = api_data.msg
                return
            }

            // 真实数据
            let real_data = api_data.data
                // 所有数据长度
            let real_length = api_data.length

            let arrayData = real_data
                // total page_number
            this.setPage(real_length);

            if (arrayData.length === 0) {
                this.toggleTip = true;
            } else {
                this.toggleTip = false;
                this.blogLimits = this.blogResultArray(arrayData);
            }
        },
        async handlerClickTagEvent(tagName) {
            let api_data = await this.$blogApi.apiGetBlogByTagName(tagName)
            log(api_data)
            var realData = api_data.data
            var processData = this.blogResultArray(realData)
            this.blogLimits = processData
            this.blogTagShow = true
        },
        /*
            TODO: 还要拆分成独立的错误捕获模块
            以下是错误捕获模块
         */
        abort_err(netErr) {
            log('netErr*****', netErr)
            var s = 0
            return netErr.code === s
        },
        // 显示错误提醒 模块
        error_module_tip_show() {
            this.errModu = true
        },

        actionEvent_closeTip(val) {
            this.errModu = false
        },

        disconnect_Error() {
            log('network status')
            var config = {
                disconnet: 'offline',
                connect: 'online'
            }
            const dis_func = function() {
                var condition = navigator.onLine ? "online" : "offline";
                log('condition', condition)
            }
            window.addEventListener(config.connect, dis_func.bind(window), false)
        }
        /*
          错误捕获模块结束
       */
    }
};