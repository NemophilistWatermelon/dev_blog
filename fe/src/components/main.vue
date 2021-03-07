<template>
    <div class="appMainView"
         :style="appStyle"
         ref="appMain">
        <!-- 时间 -->
        <TimeBar></TimeBar>
        <!-- 轮播区域 -->
        <Swiper></Swiper>
        <!-- 组件底部 -->
        <Footer />
    </div>
</template>

<script>
    const log = console.log.bind(console);
    import TimeBar from "./header/timeStatus";
    import Swiper from "./swiper/Swiper";
    import Footer from "./footer/index";

    export default {
        name: "appMainView",

        data() {
            return {
                appStyle: null,
                setWHOfWin: {
                    width: 0,
                    height: 0,
                },
            };
        },

        components: {
            TimeBar,
            Swiper,
            Footer,
        },

        created() {

        },
        updated() {},
        methods: {

        },
        computed: {
            getAppWidth() {
                return this.$refs.appMain.offsetWidth;
            },
        },
        beforeDestroy() {
            this.restScreen = null;
        },
    };

</script>

<style scoped>
    .appMainView {
        /* 水平垂直居中布局 */
        position: absolute;
        width: 400px;
        height: 700px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: #000000 0px 0px 20px 0px;
        background-color: #000;
        border-radius: 9px;

        /* 动画变换 */
        transition-property: all;
        color: #fff;
        transition-duration: 0.3s;
        overflow: hidden;
    }

    @media (max-width: 768px) {

        .k-Status,
        .slider-wrapper,
        .author_info {
            width: 100%;
        }

        .appMainView {
            width: 100% !important;
            height: 100%;
            margin: unset !important;
            /* position: unset !important; */
        }
    }

</style>
