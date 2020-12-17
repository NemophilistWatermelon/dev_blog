// var log = console.log.bind(console);

// function PageResize(el) {
//     this.el = el;
// }

// var po = PageResize.prototype;
// po.checkEl = function() {
//     log(this.el)
// }

// po.addEvent = function(callback) {

//     var o = {}
//     window.addEventListener("onresize", function(event) {
//         o.h = event.currentTarget.innerHeight;
//         o.w = event.currentTarget.innerWidth
//     })
//     callback(o);
// }
// po.getWindowContent = async function() {

//     this.addEvent(await
//             function(option) {
//                 log(option)
//             })
//         // return o;
// }

// export default PageResize;