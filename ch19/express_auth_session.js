var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var crypto = require('crypto');

function hashPW(pwd) {
  return crypto.createHash('sha256').update(pwd).
  digest('base64').toString();
}
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var options = {
  store: new FileStore(),
  secret: 'keyboard-cat',
  resave: true,
  saveUninitialized: true,
  name: 'server-session-cookie-id'
};
app.use(session(options));
app.get('/home', function (req, res) {
  if (req.session.user) {
    res.send('<h2>' + req.session.success + '</h2>' +
      '<p>You have entered the home section<p><br>' +
      ' <a href="/restricted">restricted</a>' +
      ' <a href="/logout">logout</a>');
  } else {
    res.send('<p>Please log in: <p><br>' +
      ' <a href="/login">login</a>');
  }
});
app.get('/restricted', function (req, res) {
  if (req.session.user) {
    res.send('<h2>' + req.session.success + '</h2>' +
      '<p>You have entered the restricted section<p><br>' +
      ' <a href="/logout">logout</a>');
  } else {
    req.session.error = 'Access Denied!';
    res.redirect('/accessDenied');
  }
});
app.get('/accessDenied', function (req, res) {
  res.send('<h2> Access Denied </h2>' +
    '<p>Please log in: <p><br>' +
    ' <a href="/login">login</a>');
});
app.get('/logout', function (req, res) {
  req.session.destroy(function () {
    res.clearCookie(options.name);
    res.redirect('/login');
  });
});
app.get('/login', function (req, res) {
  var response = '<form method="POST">' +
    'Username: <input type="text" name="username"><br>' +
    'Password: <input type="password" name="password"><br>' +
    '<input type="submit" value="Submit"></form>';
  if (req.session.user) {
    res.redirect('/home');
  } else if (req.session.error === 'Authentication failed') {
    response = '<h2> Authentication failed: Please try again </h2>' + response;
  }
  res.type('html');
  res.send(response);
});
app.post('/login', function (req, res) {
  //user should be a lookup of req.body.username in database
  var user = {
    name: req.body.username,
    password: hashPW("myPass")
  };
  if (user.password === hashPW(req.body.password.toString())) {
    req.session.regenerate(function () {
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;
      res.redirect('/home');
    });
  } else {
    req.session.regenerate(function () {
      req.session.error = 'Authentication failed';
      res.redirect('/login');
    });
  }
});
app.listen(80);