var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/comments?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var connection = mongoose.connect(uri, {
    useMongoClient: true
});
var commentsModel = require('./models/comments_model.js');
var photoModel = require('./models/photo_model.js');
var pageModel = require('./models/page_model.js');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('./comment_routes')(app);
app.listen(80);