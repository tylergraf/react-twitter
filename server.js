var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter');
var errorhandler = require('errorhandler')
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();
var MongoStore = require('connect-mongo')(session);

var port = 3000
var router = express.Router();

var compiler = webpack(config)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

app.use(express.static(path.resolve(__dirname, './static')));

passport.use(new TwitterStrategy({
    consumerKey: 'ArIgk34kBQEwjBWbW6PFBceFO',
    consumerSecret: 'nLSPmdtMCh9aTZQzVVcNl08dEJecGiImNu9G1SjrmvmxfHiRtz',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    var user = {
      token: token,
      tokenSecret: tokenSecret,
      profile: profile,
    }
    cb(null, user);
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({
  store: new MongoStore({
    url: 'mongodb://heroku_g7z7smtg:gi9h613fgs278ar1nl2k5tn4g@ds037095.mongolab.com:37095/heroku_g7z7smtg',
  }), secret: 'keyboard cat'}));

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {

    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.use(function(req, res, next) {
  if(req.session && req.session.passport && req.session.passport.user){
    req.user = req.session.passport.user;
  }
  next();
})
var twitter = require('./lib/twitter');
app.use('/api', twitter)

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
