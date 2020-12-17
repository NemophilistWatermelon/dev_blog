var log = console.log.bind(console)


var Painter = function () {
    var canvas = document.querySelector('#canvas')
    var context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.cxt = context
    this.canvas = canvas;
    log(this.version())
}

var definePo = Painter.prototype;
definePo.version = function () {
    return {
        version: '0.1',
        author: 'catKevin',
        produ: 'devlopment',
        description: "for canvas webapi..."
    }
}
var trans = function (w) {
    var num = 0
    var timer = null;
    timer = setInterval(function () {
        num += 1
        log('变化值weight => ', w)
        if (num > w) {
            clearInterval(timer)
            // return num
        }
    }, 1000 / 60)

    return num
}
definePo.drawRect = function (o) {
    // 绘制矩形
    this.cxt.fillStyle = o.color
    this.delay(o, 'fillRect')
    return o
}
definePo.delay = function (o, key) {
    var delay = o.delay / 60 || 1000 / 60
    var changeNum = 0
    var timer = null
    var self = this
    timer = setInterval(() => {
        changeNum += 1
        if (changeNum > o.w) {
            clearInterval(timer)
            return
        }
        self.cxt[key](o.x, o.y, changeNum, o.h)
    }, delay)
    return self;
}
definePo.drawText = function (option) {
    // 绘制文字
    var o = {
        text: option.text,
        x: option.text_XPosition,
        y: option.text_YPosition,
        color: option.color,
    }
    var text = o.text,
        x = o.x,
        y = o.y,
        color = o.color;
    this.cxt.fillStyle = color;
    this.cxt.fillText(text, x, y);
    return o;
}

definePo.LineTo = function () {
    // test 三角形
    var ctx = this.cxt;
    var width = this.width,
        height = this.height;
    var canvas = this.canvas
    canvas.addEventListener('mousemove', function (event) {
        var e = event;
        var x = e.pageX,
            y = e.pageY;
        // ctx.clearRect(0, 0, width, height)
        //  套路
        ctx.beginPath();
        ctx.moveTo(y, x);
        ctx.lineTo(0, y)
        ctx.lineTo(x, y)

        ctx.strokeStyle = "purple"
        ctx.closePath(); // draws last line of the triangle
        ctx.stroke();
        log(e.pageX, e.pageY)
    })
    return this
}
// 画圆
definePo.arc = function (option) {
    option = Object.keys(option).length === 0 && option != "" ? {} : option
    let { x, y, startAngle, endAngle, radius, dir } = option
    var ctx = this.cxt
    /** 
        @param x 圆弧中心（圆心）的 x 轴坐标。
        @param y 圆弧中心（圆心）的 y 轴坐标。
        @param radius 圆弧的半径。
        @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
        @param endAngle 圆弧的终点， 单位以弧度表示
        @param dir  可选的Boolean值 ，如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
    */
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle, dir)
    ctx.stroke()
    ctx.closePath()


}
// 初始化创建 Painter 类
Painter.init = function () {
    // Painter 私有属性
    return new this();

}