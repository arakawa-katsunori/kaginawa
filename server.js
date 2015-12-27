var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ secret: 'kogaidan' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: 'GqWXlF7lL41g1nldMXqpvLeo9',
    consumerSecret: 'i0KVjNwXpeBsnoZRBrNsRBjbWs2GHGlWDUlKaMuAWYf3pDQCGF',
    callbackURL: 'http://localhost:4000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done){
    passport.session.id = profile.id;
    profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;
    app.set('token', token);
    app.set('tokenSecret', tokenSecret);

    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

app.get('/dashboard', function(req, res) {
  if(passport.session && passport.session.id){
    console.log(passport.session.id.profile);
    fs.readFile('./www/dashboard.html', 'utf8', function(error, html){
      res.send(html);
    });
  } else {
    res.redirect('/');
  }
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  })
);

app.all('/api/*', function(req, res, next){
  urlInfo = url.parse(req.url, true);
  res.contentType('json');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/twitter/search', function(req, res){
  twitter.search(urlInfo, function(result){
    res.send(result);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
