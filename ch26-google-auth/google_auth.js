var express = require('express'),
  bodyParser = require('body-parser'),
  // cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback",
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return done(err, user);
    });
  }
));
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
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/static'));
app.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/info');
  } else {
    res.render('login', {
      user: req.user
    });
  }
});
app.get('/auth/google',
  passport.authenticate('google'));
app.get('/auth/google/return',
  passport.authenticate('google', {
    successRedirect: '/info',
    failureRedirect: '/login'
  }));
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});
app.get('/info', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('info', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
});
app.listen(80);