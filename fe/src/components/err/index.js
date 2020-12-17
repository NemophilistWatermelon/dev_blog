export default {
    name: 'err',
    props:{
        tips_content: {
            type:String,
            default() {
                return 'Loading...'
            }
        }
    },
    methods: {
        back_err(val) {
            this.$emit('back_err_event', val)
        }
    }
}
