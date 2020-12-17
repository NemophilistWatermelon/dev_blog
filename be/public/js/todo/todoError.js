const InputError = function(m) {
    var o = {
        el: e('.class-todo-error'),
        hide:'hide'
    }
    var error = o.el
    o.show = function() {
        log(this)
        removeClass(error, this.hide)
        error.innerHTML = m;
    }
    o.close = function() {
        addClass(error, this.hide)
        error.innerHTML = '';
    }
    return o
}
