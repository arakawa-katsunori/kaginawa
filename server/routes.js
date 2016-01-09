var fs = require('fs');
var url = require('url');

var routes = (app, passport) => {
  app.get('/', (req, res) => {
    if(passport.session && passport.session.id){
      fs.readFile('./www/html/dashboard.html', 'utf8', (error, html) => {
        res.send(html);
      });
    } else {
      fs.readFile('./www/html/index.html', 'utf8', (error, html) => {
        res.send(html);
      });
    }
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );

  app.all('/api/twitter/search', (req, res) => {
    urlInfo = url.parse(req.url, true);
    res.contentType('json');
    res.header('Access-Control-Allow-Origin', '*');
   
    var query = encodeURIComponent(urlInfo.query.q);
    var endPoint;

    if(/^@/.test(urlInfo.query.q)){
      endPoint = 'statuses/user_timeline.json?screen_name=';
    }else{
      endPoint = 'search/tweets.json?q='
    }
      
    passport._strategies.twitter._oauth.getProtectedResource(
      'https://api.twitter.com/1.1/' + endPoint + query + '&count=100',
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
