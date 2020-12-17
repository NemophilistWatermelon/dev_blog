import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
    name: "player",
    data() {
        return {
            playerOptions: {
                // videojs options
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                }],
                poster: "/static/images/author.jpg",
            }
        }
    },
    components: {
        videoPlayer
    },
    mounted() {
        console.log('this is current player instance object', this.player)
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        }
    },
    methods: {
        // listen event
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        // ...player event

        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
            console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
        }
    }

}