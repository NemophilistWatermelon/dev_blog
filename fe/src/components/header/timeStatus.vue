<template>
  <div class="k-Status">
    <h_svg :size="size" />
    <wifi :size="size" />
    <div class="timer">
      {{ timeShow.hours }}{{ timeShow.blink }}{{ timeShow.min }}
    </div>
  </div>
</template>

<script>
const log = console.log.bind(console);
import info from "./head/info.vue";
import wifi from "./head/wifi.vue";

export default {
  name: "k-Status",
  data() {
    return {
      // 定时器，在组件离开后销毁；
      timer: "",
      // 显示时间
      size: 20,
      timeShow: {
        hours: new Date().getHours(),
        min: new Date().getMinutes(),
        blink: ":",
      },
      //   pick: "",
      // 本v中 所有变换 由此判断
      status: false,
      // 电量
      //   electri: "100%",
    };
  },
  components: {
    h_svg: info,
    wifi: wifi,
  },
  methods: {
    time() {
      var time = new Date();
      this.timeShow.hours = this.getZero(time.getHours());
      this.timeShow.min = this.getZero(time.getMinutes());
    },
    getZero(timeNum) {
      return timeNum < 10 ? "0" + timeNum : timeNum;
    },
  },
  mounted() {
    this.timer = setInterval(this.time, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    //  回收变量
    this.timer = null;
  },
};
</script>

<style scoped>
.k-Status {
  position: relative;
  display: flex;
  justify-content: start;
  width: 100%;
  height: 25px;
  line-height: 25px;
  margin-bottom: 3px;
}

.k-Status .timer {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: #858585;
}

.k-Status span:first-child {
  text-align: left;
}

.k-Status span:last-child {
  text-align: right;
}

.elec-full {
  color: seagreen;
}

.elec-low {
  color: crimson;
  font-weight: bold;
}
</style>
