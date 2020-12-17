const dir = console.log.bind(console)
const log = console.log.bind(console)
    // import  './highlight.js'
import hljs from 'highlight.js';
export default {
    name: 'blogContent',
    props: {
        tit: {
            type: String,
            default () {
                return 'blog nothing title!'
            },
        },
        timeStamp: {
            type: String,
            default () {
                return this.time
            },
        },
        content: {
            type: String,
            default () {
                return 'blog nothing title!'
            },
        },
        time: {
            type: String,
            default () {
                return 'blog nothing title!'
            },
        },
        artIndex: {
            type: String,
            required: true
        },
        catgory: {
            type: Array,
            default () {
                return ['前端']
            }
        }

    },

    methods: {
        HandlerFilterTagName(tagName) {
            if (!tagName) {
                return;
            }
            this.$emit('HandlerTagName', tagName)
        }
    }

};