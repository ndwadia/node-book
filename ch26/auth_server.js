var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');
var usersModel = require('./models/users_model.js');
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/User?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var connection = mongoose.connect(uri, {
  useMongoClient: true
});
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(expressSession({
  name: 'server-session-cookie-id',
  secret: 'mySECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  store: new mongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
  })
}));
require('./routes')(app);
app.listen(80);