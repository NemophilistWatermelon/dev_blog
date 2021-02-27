<template>
  <div class="appMainView" :style="appStyle" ref="appMain">
    <!-- 时间 -->
    <TimeBar></TimeBar>
    <!-- 轮播区域 -->
    <Swiper></Swiper>
    <!-- 组件底部 -->
    <Footer />
  </div>
</template>

<script>
var log = console.log.bind(console);

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
    // this.postWHparamsOfWindow();
    // 加载就调用 此方法
    // 如果开启 屏幕 匹配
    // this.restScreen();
  },
  updated() {},
  methods: {
    postWHparamsOfWindow() {
      var { width, height } = this.setWHOfWin;
      var { width, height } = this.getWHparamsOfWindow();
      this.setWHOfWin = { width, height };
      let innerHeight = this.setWHOfWin.height;
      let innerWidth = this.setWHOfWin.width;
      this.setAppWidthHandler({ innerWidth, innerHeight }, "px");
      return;
    },
    getWHparamsOfWindow() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    restScreen() {
      window.addEventListener("resize", (event) => {
        var e = event || window.event;
        this.setAppStyleQuery(e.target, "px");
      });
    },
    //   @params1 => window.target && @params2 => 单位
    setAppStyleQuery(target, after) {
      // 文档基础信息
      this.setAppWidthHandler(target, "px");
    },
    setAppWidthHandler(windowTarget, after) {
      var wW = windowTarget.innerWidth;
      var wH = windowTarget.innerHeight;
      var o = {};
      if (wW < 768) {
        // 小屏 响应式 6寸
        o.width = "100%";
        o.height = "100%";
        o["margin-left"] = 0;
        o["margin-top"] = 0;
        o.left = 0;
        o.top = 0;
      } else if (wW > 768 && wW < 1000) {
        o.height = wH - 100 + after;
        o.width = wW / 2 + after;
        o["margin-left"] = -(wW / 4) + after;
        o["margin-top"] = -(wH - 100) / 2 + after;
      } else {
        this.appStyle = null;
      }
      this.appStyle = o;
    },
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

