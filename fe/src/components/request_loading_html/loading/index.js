const log = console.log.bind(console)
export default {
    name: 'blog_loading',
    props: {
        message: {
            type: String,
            default: () => 'Blog is Comming'
        },
        trigger: {
            type: Boolean,
            default: () => true
        }
    },
    watch: {
        trigger(val) {
            log('trigger bugger*****', val)
        }
    }
}