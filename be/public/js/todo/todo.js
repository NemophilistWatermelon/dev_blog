// todo 的所有操作

const Todo = function() {
}
Todo.new = function() {
    var o = new this
    return o
}
Todo.prototype = {
    // 创建一个Todo

    async saveTodo(todo) {
        var method = 'post'
        var data = todo
        var path = '/api/todo/add'
        var request = {
            method,
            data,
            url:path,
        }
        return await axios(request)
    },

    createTodo(todo) {
        // 如果需要增加存储字段
        todo.done = false
        todo.c_t = new Date().getTime()
        todo.u_t = new Date().getTime()
        return this.saveTodo(todo);
    },
    async selectTodo() {
        var method = 'get'

        var path = '/api/todos'
        var request = {
            method,
            url:path,
        }

        return await axios(request)
    },
    deleteTodo(todo_id) {

    },
    // todo 模板
    template(data) {
        var todo = {
            check: data.done || false,
            content: data.task,
            c_t: data.c_t,
            id: data.id,
            todo_id: data.todo_id,
            catgory: data.catgory,
        }
        // format time
        var c_t = new Date( Number(data.c_t) ).toLocaleString()
        log(todo.c_t)
        var contro_option = {
            "toggle": false,
            "id": todo.id,
        }

        var t = `
            <div class="todo-cell" data-todo=${ JSON.stringify(data) } data-contro = ${ JSON.stringify(contro_option) }>
                <div class="todo_check">
                    <input type="checkbox" class="checkBox" ${todo.check ? 'checked' : ''}>
                    <label class='checked_lable'>
                    </label>
                </div>
                <div class='class-todo-select hidden'>
                    <select>
                        <option class='select danger'>
                            紧急
                        </option>
                        <option class='select finish'>
                            完成
                        </option>
                        <option class='select cancel'>
                            取消
                        </option>
                        <option class='select delete'>
                            删除
                        </option>
                    </select>
                </div>
                <div class='class-todo-list'>
                    <span>${todo.id + 1}</span>
                    <span>${todo.content.substring(0, 2)}</span>
                    <span class='time'>${c_t}</span>
                    <span>${todo.catgory}</span>
                </div>
            </div>
        `
        return t
    },
    // 渲染todo 列表 需要传递渲染父节点
    select() {
        var todos = this.selectTodo()
        return todos
    },
    renderTodoFromLocal(element, todos) {
        var length = todos.length
        var s = ''
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var t = todos[i]
                t.id = i
                s += this.template(t);
            }
            element.innerHTML = s
        }
    },


}
