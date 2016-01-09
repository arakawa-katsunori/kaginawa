var fs = require('fs');
var url = require('url');

var routes = (app, passport) => {
  app.get('/', (req, res) => {
    fs.readFile('./www/html/index.html', 'utf8', (error, html) => {
      res.send(html);
    });
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/search',
      failureRedirect: '/'
    })
  );

  app.get(['/search', '/search/tweets', '/search/account'], (req, res) => {
    if(passport.session && passport.session.id){
      fs.readFile('./www/html/search.html', 'utf8', (error, html) => {
        res.send(html);
      });
    } else {
      res.redirect('/');
    }
  });

  app.get('/search/tweets.json', (req, res) => {
    urlInfo = url.parse(req.url, true);
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    var query = encodeURIComponent(urlInfo.query.q);
    passport._strategies.twitter._oauth.getProtectedResource(
      `https://api.twitter.com/1.1/search/tweets.json?q=${query}&count=100`,
      'GET',
      app.get('token'),
      app.get('tokenSecret'),
      (err, data) => {
        if(err){
          res.status(500).send(err);
          return;
        }
        res.send(data);
      }
    );
  });

  app.get('/search/account.json', (req, res) => {
    urlInfo = url.parse(req.url, true);
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
    var query = encodeURIComponent(urlInfo.query.q);
    passport._strategies.twitter._oauth.getProtectedResource(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${query}&count=100`,
      'GET',
      app.get('token'),
      app.get('tokenSecret'),
      (err, data) => {
        if(err){
          res.status(500).send(err);
          return;
        }
        res.send(data);
      }
    );
  });
};

module.exports = routes;
