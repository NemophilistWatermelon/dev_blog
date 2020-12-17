import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/blog',
        name: 'blog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/blog/blog.vue')
    },
    {
        path: '/node',
        name: 'node',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/node/index.vue')
    },
    {
        path: '/',
        name: 'index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/main.vue')
    },
    {
        path: '/blog/blogDet/:id',
        name: 'blogDetail',
        component: () =>
            import ('../views/blog/blogAll/index.vue')
    },
    {
        path: '/profile/player',
        name: 'player',
        component: () =>
            import ('../views/player/index.vue')
    },

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router