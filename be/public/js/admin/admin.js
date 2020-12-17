const log = console.log.bind(console)
    // 测试函数
const stringDebugSpace = function(str) {
        log('检测变量是否有空格deBug:', `(${str})`)
    }
    // token.js
const initBodyData = function() {
    var body = $('body').data('res')
    window.author = body
    if (body.usr) {
        return true
    } else {
        return false

    }
}

const tdTemplateBy = function(data) {
    if (!data) {
        return
    }
    var id = data.id,
        blogTit = data.blogTitle,
        time = new Date(parseInt(data.blogCreateTime)).toLocaleDateString(),
        cat = data.blogCatgory,
        autor = data.blogAuthor;
    var t =
        `<tr data-blog="{id:${id}, blogTit:${blogTit}, autor:${autor}, time:${time}, cat:${cat}">
                <td> ${id} </td>
                <td> ${blogTit} </td>
                <td>${autor} </td>
                <td>${ time} </td>
                <td>${cat} </td>
                <td >
                    <button class="btn  btn-danger" onclick=del(${id})>del</button>
                    <button class="btn btn-warning" onclick=edit(${id})>edit</button>
                 </td>
            </tr>`
    return t
}

const domRender = function(ele, domTemplate) {
    ele.empty().append(domTemplate)
    return true
}

const startRenderTrByDataLength = function(data) {
    var saveBlogs = []
    var length = data.length;
    for (let i = 0; i < length; i++) {
        var d = data[i];
        var t = tdTemplateBy(d);
        saveBlogs.push(t)
    }
    var bool = domRender($("#tbodyBlog"), saveBlogs);
    if (bool) {
        saveBlogs.length = 0;

    }
}

const sendAjaxAndRenderBlogTable = function(n) {
    var configParams = {
        start: n,
    }
    $.ajax({
        method: "get",
        data: configParams,
        url: basePath,
        async: true,
        success: function(data) {
            startRenderTrByDataLength(data.data)
        },
        error: function(err) {
            if (err.responseJSON.code) {
                // alert('木得数据🙃')
                // toast
                automationToast({
                    tit: "提示信息",
                    content: "木得数据🙃",
                    stopTime: 3000
                })

            }
        }

    })
}
const basePath = 'http://118.31.4.145:3000/api/limitBlog'

const page = async function(index = 1) {
    // TODO: 分页
    var pageParent = $('.pageParent')
    var pageTemp = "";
    if (index <= 1) {
        pageTemp += `
                <li class="page-item active" aria-current="page" data-action="click" data-pageNum=1>
                    <span class="page-link" >
                        1
                    </span>
                </li>
                <li class="page-item " aria-current="page" data-action="click" data-pageNum=2>
                    <span class="page-link" >
                        2
                    </span>
                </li>
                <li class="page-item " aria-current="page" data-action="click" data-pageNum=3>
                    <span class="page-link" >
                        3
                    </span>
                </li>
                    `
    } else {
        // 注意 index 指向
        var mainIndex = index
        var prev = (mainIndex - 1)
        var next = (mainIndex + 1)
            // log("prev:" + prev, 'index:' + index, 'next:' + next)
        pageTemp += `
                <li class="page-item " aria-current="page" data-action="click" data-pageNum=${prev}>
                    <span class="page-link" >
                        ${prev}
                    </span>
                </li>
                <li class="page-item active " aria-current="page" data-action="click" data-pageNum=${mainIndex}>
                    <span class="page-link" >
                        ${mainIndex}
                    </span>
                </li>
                <li class="page-item " aria-current="page" data-action="click" data-pageNum=${next}>
                    <span class="page-link" >
                            ${next}
                    </span>
                </li>
                    `
    }
    domRender(pageParent, pageTemp)
    actionEvent(pageParent)
}

const getBlogDataByLimitStart = function(start) {
    sendAjaxAndRenderBlogTable(start)
}

const actionEvent = function(pageParent) {
    $('.page-item').each(function(item) {
        var actions = $(this).data('action')
        $(this).on(actions, function(event) {
            var _self = $(this)
            var index = _self.data('pagenum')
                // 清除掉自身孩子节点 并重新渲染新值
            pageParent.children().remove()
            page(index)
            getBlogDataByLimitStart(index);
        })
    })
}

const menuList = function() {
    var item = $('.menu_list')
    return item;
}
const menuBoard = function() {
    var menuBoad = $('.r-aside')
    return menuBoad.children()
}
const bindEventMenuClicks = function() {
    var menu = menuList();
    var boards = menuBoard(),
        boardsLength = boards.length;


    $(menu).on('click', function(e) {
        e.preventDefault();
        var target = e.target
        if (target.nodeName == 'LI') {
            $(target)
                .addClass('active')
                .siblings()
                .removeClass('active')
            var selfDataMenu = $(target).data().menu
            for (let i = 0; i < boardsLength; i++) {
                let e = boards[i];
                let boardsMenu = $(e).data().menu
                log('boardsMenu:', boardsMenu)
                if (selfDataMenu == boardsMenu) {
                    $(e)
                        .addClass('show')
                        .removeClass("hide")
                        .siblings()
                        .removeClass("show")
                        .addClass('hide')
                }

            }
        }
    })


}
const __main = function() {
    page()
    bindEventMenuClicks()
    sendAjaxAndRenderBlogTable(1)
}
__main()