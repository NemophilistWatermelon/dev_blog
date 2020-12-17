// 主视图

<template>
  <div class="slider-wrapper">
    <div
      class="slider-area"
      ref="slider"
      @mousedown.stop.prevent="d($event)"
      @mouseup.stop.prevent="u($event)"
      @mousemove.stop.prevent="m($event)"
      @mouseleave.stop.prevent="l($event)"
      @touchstart="d($event)"
      @touchmove="m($event)"
      @touchend="u($event)"
    >
      <!--  第一页 -->
      <SwiperItem>
        <div class="d-layout" slot="layout">
          <section class="appCategoryName">
            <span>雜·燴</span>
          </section>
          <!-- 导入app 块项 -->
          <zahv />
        </div>

        <div class="d-layout" slot="layout">
          <section class="appCategoryName">
            <span>炒·飯</span>
          </section>
          <ikfj />
        </div>
      </SwiperItem>
      <!--  第二页 -->
      <SwiperItem>
        <div class="d-layout" slot="layout">
          <section class="appCategoryName">
            <span>亂·燉</span>
          </section>
          <lrdp />
        </div>
      </SwiperItem>
    </div>

    <!-- 指示器区域 -->

    <div class="iterater" ref="iterater">
      <span
        :class="index == 0 ? 'active' : ''"
        v-for="(item, index) in sliderLen"
        :key="index"
      ></span>
    </div>
  </div>
</template>

<script>
import SwiperItem from "./SwiperItem";
import zahv from "./menu_list/first_page/zahv";
import ikfj from "./menu_list/first_page/ikfj";
import lrdp from "./menu_list/second_page/lrdp";

const dir = console.dir.bind(console);
const log = console.log.bind(console);

var slider = null,
  startX = 0,
  translateX = 0,
  startPoint = null,
  sliderChildWidth = 0,
  num = 0,
  l = 0,
  iterater = null,
  touches = null;

export default {
  name: "Swiper",
  data() {
    return {
      sliderLen: 0,
    };
  },
  components: {
    SwiperItem,
    // appButton,
    zahv,
    ikfj,
    lrdp,
  },
  mounted() {
    slider = this.$refs.slider;
    iterater = this.$refs.iterater;
    this.sliderLen = slider.children.length;
    this.cssTransform(slider, "translateX", 0);
    this.autoPlay();
  },

  methods: {
    // 按下
    d(e) {
      // 开启 滑动 状态
      e = window.event || e;

      this.controEvent = true;
      startX = this.cssTransform(slider, "translateX");
      startPoint = e.pageX;
      // 移动端获取 当前位置
      if (e.type === "touchstart") {
        touches = e.touches[0];
        startPoint = touches.pageX;

        log("startX:", startPoint);
      }
    },
    // 移动
    m(e) {
      e.preventDefault();
      var nowPoint = e.pageX || e.touches[0].pageX;
      var diffX = nowPoint - startPoint;
      translateX = diffX + startX;
      if (this.controEvent) {
        this.cssTransform(slider, "translateX", translateX);
      }
      if (e.type === "touchmove") {
        this.cssTransform(slider, "translateX", translateX);
      }
    },
    // 松开
    u(e) {
      this.controEvent = false;
      sliderChildWidth = slider.children[0].offsetWidth;
      l = this.cssTransform(slider, "translateX");
      l = Math.min(0, l);
      l = Math.max(-sliderChildWidth * (slider.children.length - 1), l);
      num = l / sliderChildWidth;
      this.cssTransform(
        slider,
        "translateX",
        Math.round(num) * sliderChildWidth
      );
      // this.autoPlay("set");
      this.checkActiveClass(-num);
    },
    l(e) {
      this.controEvent = false;
      this.cssTransform(
        slider,
        "translateX",
        Math.round(num) * sliderChildWidth
      );
      // this.autoPlay("set");
      this.checkActiveClass(-num);
    },
    checkActiveClass(num) {
      var num = Math.round(num);
      var length = iterater.children.length;
      for (let i = 0; i < length; i++) {
        var cs = iterater.children;
        if (cs[i] === cs[num]) {
          cs[i].classList.add("active");
        } else {
          cs[i].classList.remove("active");
        }
      }
    },
    autoPlay(option) {
      if (option === "set") slider.style["transition"] = "all .1s";
      else slider.style["transition"] = "";
    },
    cssTransform(obj, attr, val) {
      if (!obj.transform) {
        obj.transform = {};
      }

      // a.length > 3 则认为 是设置属性
      if (arguments.length === 3) {
        obj.transform[attr] = val;
        // 用于拼接 设置的属性
        var strTemp = "";
        // 存储到目标元素的属性中 作为内存
        for (let key in obj.transform) {
          strTemp += `${key}(${obj.transform[key]}px)`;
        }
        // 给目标元素设置动态style
        obj.style.transform = strTemp;
      } else {
        // 其他情况 用作为 obj 获取属性值
        val = obj.transform[attr];
        if (typeof val === undefined) {
          val = 0;
        }
        return val;
      }
    },
  },
};
</script>

<style>
.slider-wrapper {
  position: absolute;
  width: 100%;
  top: 5%;
  height: 80%;
  overflow: hidden;
}

.slider-area {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 指示器 */
.iterater * {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 50%;
}

.iterater *:nth-child(2) {
  margin: 0 10px;
}

.iterater .active {
  background-color: #717171;
}
</style>
