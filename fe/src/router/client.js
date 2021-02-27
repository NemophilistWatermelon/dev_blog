const login = {
    path: '/client/login',
    name: 'client_login',
    component: () =>
        import ("@/views/client/login/index.vue")
}
const index = {
    path: '/client/index',
    name: 'client_index',
    component: () =>
        import ("@/views/client/index/index.vue")
}
export default [
    login,
    index,
]