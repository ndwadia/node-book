var express = require('express');
var app = express();
app.use('/', express.static('./ch19/static')); //, {maxAge: 60*60*1000});
app.use('/images', express.static( './images'));
app.listen(80);