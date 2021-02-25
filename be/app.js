/**
 * @name node后端套路Express
 */


const express = require('express');
const app = express();
const log = console.log.bind(console);
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route/init_routes.js');
const path = require('path');
const session = require('express-session')
    //  配置端口号
const port = 3000;
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        },
    }))
    //开放静态资源目录
app.use(express.static("public"))
app.engine('html', require('express-art-template'));
// app.engine('pug', require('express-art-template'));

app.set('views', path.join(__dirname, './views'))
    // body-parser json 数据配置
app.use(bodyParser.urlencoded({
    extended: true,
    // 数据格式增加限制 默认 100K
    limit: '21000000kb',
}));

app.use(bodyParser.json());

app.use(cors());

router.get('*', function(req, res, next) {
        res.render('../views/not_fund/404.html')
    })
    // api 路由注册
app.use(router);
//  端口配置


app.listen(port, () => {
    log(`App running in ${port}`);
});


module.exports = app;