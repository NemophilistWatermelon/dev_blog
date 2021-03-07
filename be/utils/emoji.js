const fs = require('fs')
var data = fs.readFileSync('./emoji.json', 'utf-8')
module.exports = data