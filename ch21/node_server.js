var express = require('express');
var app = express();
app.use('/', express.static('./ch21/static')).
    use('/images', express.static( './images')).
    use('/lib', express.static( './lib'));
app.listen(80);