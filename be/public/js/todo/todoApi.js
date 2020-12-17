  const saveTodo = async function(form) {
    var t = Todo.new()
    // var form = {
    //     title: 'test',
    //     content: '你好',
    //     catgory: 'test',
    // }
    var result = await t.createTodo(form)

}





const loadTodos = async function() {
    var element = e('.todoResult')
    var t = Todo.new()
    var result = await t.select()
    t.renderTodoFromLocal(element, result.data)

}
