<template>
    <div class="k-Status">
        <span>{{ pick }}</span>
        <span>{{ timeShow.timeHours }}{{ timeShow.timeBlink }}{{ timeShow.timeMinutes }}</span>
        <span :class="status ? 'elec-full': 'elec-low' ">{{ electri}}</span>
    </div>
</template>

<script>
    export default {
        name: "k-Status",
        data() {
            return {
                // 定时器，在组件离开后销毁；
                timer: "",
                // 显示时间
                timeShow: {},
                pick: "",
                // 本v中 所有变换 由此判断
                status: false,
                // 电量
                electri: "100%"
            };
        },
        methods: {
            time() {
                var time = new Date();

                this.timeShow.timeHours = this.getZero(time.getHours());
                this.timeShow.timeMinutes = this.getZero(time.getMinutes());

                if (!this.status) {
                    this.pick = "无信号...";
                    this.status = true;
                    this.electri = "100%";
                    this.timeShow.timeBlink = ":";
                } else {
                    this.pick = "5G";
                    this.status = false;
                    this.electri = "10%";
                    this.timeShow.timeBlink = " ";
                }
            },
            getZero(timeNum) {
                return timeNum < 10 ? "0" + timeNum : timeNum;
            }
        },
        mounted() {
            this.timer = setInterval(this.time, 1000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
            //  回收变量
            this.timer = null;
        }
    };
</script>

<style scoped>
    .k-Status {
        position: absolute;
        width: 100%;
        display: flex;
        flex: 4;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        margin-bottom: 3px;
        padding: 12px 5px;
    }

    .k-Status span {
        display: inline-block;
        line-height: 20px;
        flex: 1;
        transition-property: color;
        transition-duration: 1s;
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
