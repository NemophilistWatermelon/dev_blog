// 这是页面上的所有操作
/*

    底部选项
        我的 => ProfileEvent
    页面加载 initTodoPage
    待办列表与写 Todo 页面 双重切换 todoListEvent && todoWriteEvent

*/
const ProfileEvent = function(target) {
    var o = {
        target: e('.profile_l'),
        activeClass: 'activePanel',

    }
    o.selfDataSet = function() {
        return JSON.parse(this.target.dataset.pannelshow)
    }
    var todoLeftPannel = o['target'],
        selfDataSet = o.selfDataSet();
    o.processPanel = function(conditional) {
        if (conditional) {
            addClass(todoLeftPannel, this.activeClass)
            todoLeftPannel.dataset.pannelshow = String(conditional)
        } else {
            removeClass(todoLeftPannel, this.activeClass)
            todoLeftPannel.dataset.pannelshow = String(conditional)
        }
    }
    o.setProfileStatus = function(selfDataSet) {
        this.selfDataSet ? o.processPanel(!selfDataSet) : o.processPanel(!selfDataSet)
    }
    o.setProfileStatus(selfDataSet)
    return o;
}
// 这个方法用于底部Todo 与 待办列表 页面的切换
const checkPage = function(self, hideClass, elsePage) {
    var o = {
        self,
        hideClass,
        elsePage,
    }
    o.fade = function(element, className) {
        addClass(element, className)
    }
    o.show = function(element, className) {
        removeClass(element, className)
    }
    o.update = function() {
        this.fade(this.elsePage, this.hideClass)
        this.show(this.self, this.hideClass)
    }
    return o
}
// 点击 底部侧栏 Todo
const todoWriteEvent = function(target) {
    var o = {
        element: e('.todoWritePage'),
        hideClass: 'hide',
        elsePage: e('.todo_show'),
    }
    var c = checkPage(o.element, o.hideClass, o.elsePage)
    c.update()

}
// 点击 底部侧栏 待办列表
const todoListEvent = function(target) {
    var o = {
        element: e('.todo_show'),
        hideClass: 'hide',
        elsePage: e('.todoWritePage')
    }
    var c = checkPage(o.element, o.hideClass, o.elsePage)
    c.update()

}
// 提交一个 todo
const todoSubmit = function(target) {
    var form = {
        task: e('.class-todo-task').value,
        catgory: e('.class-todo-catgory').value,
    }
    // 错误提示
    var m = '输入不可以为空'
    for (var k in form) {
        if (form[k] === '') {
            InputError(m).show()
            return
        }
    }
    InputError().close()
    return saveTodo(form)
}
// Todo 页面加载 首先展示 写Todo 页面
const initTodoPage = function() {
    var o = {
        page: '.todoPage',
        hide: 'hide'
    }
    var todoPages = es(o.page)
    var l = todoPages.length
    for (var i = 0; i < l; i++) {
        var t = todoPages[i]
        addClass(t, o.hide)
    }
}
// todo 列表中每一项 的 选框操作
const todo_check_event = function(event) {
    var processTodoListAnimation = function() {
        var o = {
            // select: es('.class-todo-select')[id],
            // todo_list: es('.class-todo-list')[id],
            // hidden: 'hidden',
            // moveLeft: 'move-left',
        }
        o.select_dataset_option = function(element, key) {
	        // 判断 element 是否存在
            if(element == null) {
                log(`选择对象是空的 is (${element})`)
                return
            }

            var d = JSON.parse(element.dataset.contro)
            return d[key]
        }
        o.fix = function(element, key, val) {
            var d = JSON.parse(element.dataset.contro)
            d[key] = val
            element.dataset.contro = JSON.stringify(d);
        }
        o.update = function(func, isbool = false) {
            isbool ? func() : ""
        }
        return o
    }
    var pro_list = processTodoListAnimation()
    var target = event.target
    // 父级节点 todo-cell
    var p = target.closest('.todo-cell')

    var id = pro_list.select_dataset_option(p, 'id')
    var toggle = pro_list.select_dataset_option(p, 'toggle')

    var label_class = 'checked_lable'
    var classList = {
        hidden: 'hidden',
        moveLeft: 'move-left'
    }
    var elements = {
        select: es('.class-todo-select')[id],
        todo_list: es('.class-todo-list')[id],
    }

    if (target.classList.contains(label_class)) {
        var checkBox = target.previousElementSibling
        if (!toggle) {
            pro_list.update(function() {
                removeClass(elements.select, classList.hidden)
                addClass(elements.todo_list, classList.moveLeft)
            }, true)
            log('p', p)
            pro_list.fix(p, 'toggle', true)
            log('toggle', toggle)
        } else {
            pro_list.update(function() {
                addClass(elements.select, classList.hidden)
                removeClass(elements.todo_list, classList.moveLeft)
            }, true)
            log('p', p)
            pro_list.fix(p, 'toggle', false)
        }
        checkBox.checked = !checkBox.checked
        log('check checked:', checkBox.checked)
    }
}
