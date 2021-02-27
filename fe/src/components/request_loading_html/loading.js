import Vue from 'vue'
import blog_loading from '@/components/request_loading_html/loading/index.vue'

const log = console.log.bind(console)
    // 灌入 vue 的 操作, 直接引入的 这个vue 文件就是一个 虚拟dom 
    /*
        经过vue extend 之后 就有了 vue 一系列的操作
    */
const Blog_Loading = Vue.extend(blog_loading)

let blog_loading_html = new Blog_Loading()
const Message = function() {
    // 实例创建
    blog_loading_html.vm = blog_loading_html.$mount()
        // document.body.querySelector('.blog-container').insertAdjacentElement('afterend', blog_loading_html.vm.$el);
    document.body.insertAdjacentElement('beforeend', blog_loading_html.vm.$el)
    return blog_loading_html.vm;
}

Message.show = function(msg, trigger = true) {
    blog_loading_html.message = msg
    blog_loading_html.trigger = trigger
}
Message.close = function(trigger = false) {
        blog_loading_html.trigger = trigger
    }
    // document.body.appendChild(blog_loading_html.$el);

export default Message