module.exports = {
    lintOnSave: false,
    // 配置 打包后 src 不显示源代码vue 文件
    productionSourceMap: false,
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:3000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
                // https: true,
            }
        },
    }
}
