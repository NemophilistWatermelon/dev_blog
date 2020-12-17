const log = console.log.bind(console)
const dir = console.dir.bind(console)
import hljs from 'highlight.js';

import Profile from '../../../components/profile/index.vue'

var config = {
    name: 'blogAll',
    data() {
        return {
            blogData: null,
            blogIndex: null,
        }
    },

    directives: {
        hightLight: {
            inserted: function (el) {
                let blocks = el.querySelectorAll('pre code');
                blocks.forEach((block) => {
                    hljs.highlightBlock(block)
                })
            }
        }
    },
    components: {
        Profile
    },
    async created() {
        this.blogIndex = this.$route.params.id;
        await this.getData(this.blogIndex)
        this.setTitle();
    },
    mounted() {
        this.goHeadtop()
    },
    methods: {
        setTitle() {
            let title = this.blogData[0].blogTitle
            document.title = title;
        },
        async getData(index) {
            var data = await this.$blogApi.apiGetBlogDetail(index)
            this.blogData = data.data

        },
        goHeadtop() {
            console.log('生效了')
            window.scrollTo(0, 0)
        }
    }


}

export default config
