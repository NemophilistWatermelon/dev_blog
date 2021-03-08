const { log } = require("../lib/util")

//  留言模块
const post_user_words = (req, res) => {
    var form = {
        yours: req.body.usr,
        partten: req.body.words,
        yours_link: req.body.yours_link,
    }
    res.send({
        msg: 'success',
        form,
    })
}
const words = {
    method: 'post',
    path: '/blog/author/push_words',
    func: post_user_words
}
module.exports = [
    words,
]