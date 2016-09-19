const fs = require('fs')
const url = require('url')
const castJsonFormat = require('./helpers/castJsonFormat')

const routes = (app, passport) => {
  app.get('/', (req, res) => {
    if(passport.session && passport.session.id){
      res.redirect('/search')
    } else {
      fs.readFile('./www/html/login.html', 'utf8', (error, html) => {
        res.send(html)
      })
    }
  })

  app.get('/search', (req, res) => {
    if(passport.session && passport.session.id){
      fs.readFile('./www/html/index.html', 'utf8', (error, html) => {
        res.send(html)
      })
    } else {
      res.redirect('/')
    }
  })

  app.get('/auth/twitter', passport.authenticate('twitter'))

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  )

  const twitterAPI = 'https://api.twitter.com/1.1/'

  app.get('/search/tweets.json', (req, res) => {
    let urlInfo = url.parse(req.url, true)
    res.contentType('json')
    res.header('Access-Control-Allow-Origin', '*')
    passport._strategies.twitter._oauth.getProtectedResource(
      twitterAPI + 'search/tweets.json' + urlInfo.search,
      'GET',
      app.get('token'),
      app.get('tokenSecret'),
      (err, data) => {
        if(err){
          res.status(500).send(err)
          console.error(err)
          return
        }
        res.send(castJsonFormat.searchResult(data))
      }
    )
  })

  app.get('/search/account.json', (req, res) => {
    let urlInfo = url.parse(req.url, true)
    res.contentType('json')
    res.header('Access-Control-Allow-Origin', '*')
    let query = encodeURIComponent(urlInfo.query.q)
    passport._strategies.twitter._oauth.getProtectedResource(
      twitterAPI + 'statuses/user_timeline.json?screen_name=' + query + '&count=100',
      'GET',
      app.get('token'),
      app.get('tokenSecret'),
      (err, data) => {
        if(err){
          res.status(500).send(err)
          return
        }
        res.send(data)
      }
    )
  })
}

module.exports = routes
