const automationToast = function (objInfo) {
    var body = $('body'),
        toastTimer = null;
    var o = objInfo
    var cssTxt = `
            <style class="toast-css">
                :root{
                    --fixed_width: 20%;
                }
                .fixed-mid {
                    position: fixed;
                    /* color: red; */
                    /* border: 1px dashed; */
                    /* height: 30px; */
                    top:30%;
                    right:0;
                    width: var(--fixed_width);
                    transform: translateX(1000px);
                    transition: transform 1s linear;
                }
                .fixed-mid.fixed-line-trough{
                    // transform: translateX(0);
                    animation:trans-x 1s linear;
                }
                @keyframes trans-x {
                    0%{
                        transform: translateX(50px);
                        font-size:50px;
                        opacity:1
                    }
                    50%{
                        transform: translateX(-50px);
                        opacity:0.8
                    }
                    100%{
                        transform: translate(-50px, -100px);
                        opacity:0.1
                    }
                }
            </style>
        `
    var t = `
            <div class="k-toast panel panel-danger fixed-mid ">
                <section class="panel-heading">
                    <span class="panel-title">${o.tit}:</span>
                </section>
                <section class="panel-body">
                    <span class="text-danger">${o.content}</span>
                </section>
            </div>
        `

    body.get(0).insertAdjacentHTML('beforeEnd', t)
    body.get(0).insertAdjacentHTML('beforeEnd', cssTxt)
    var toast_css = $('.toast-css')
    var failePanel = $('.k-toast')
    var clearTime = o.stopTime
    failePanel.addClass("fixed-line-trough")
    // 清除 页面创建元素
    toastTimer = setTimeout(function () {
        failePanel.removeClass('fixed-line-trough')
        body.find(failePanel).remove().end().find(toast_css).remove()
    }, clearTime)
}