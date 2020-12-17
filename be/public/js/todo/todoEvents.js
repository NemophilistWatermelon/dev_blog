//界面的事件委托
const todoEvents = function(event) {
    event.preventDefault();
    var target = event.target
    // 开关profile
    var todoProfileBtn = 'class-close-frofile'
    if (target.classList.contains(todoProfileBtn)) {
        ProfileEvent(target)
    }
    //  写 todo 需要做的事情
    var todoWriteBtn = 'class-close-todo'
    if (target.classList.contains(todoWriteBtn)) {
        todoWriteEvent(target)
    }
    // 待办列表需要做的事情
    var todoListBtn = 'class-close-todoList'
    if (target.classList.contains(todoListBtn)) {
        todoListEvent(target)
    }
    // 提交todo 待办
    var todoSubmitBtn = 'class-todo-submit'
    if (target.classList.contains(todoSubmitBtn)) {
        todoSubmit(target)
    }
}

const bindTodoResult = function() {
    var todoResult = e('.todoResult')
    bindEvent(todoResult, 'click', todo_check_event, false)
}
const bindTodoProfile = function() {
    var todoPannel = e('.todo_container')
    bindEvent(todoPannel, 'click', todoEvents, !0)
}

const bindEvents = function() {
    // 绑定 profile 动画
    bindTodoProfile()
    bindTodoResult()

}
