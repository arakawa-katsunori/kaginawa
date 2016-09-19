var TwitterStrategy = require('passport-twitter').Strategy

var auth = (app, passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  })

  passport.use(new TwitterStrategy({
      consumerKey: process.env.KAGINAWA_CONSUMER_KEY,
      consumerSecret: process.env.KAGINAWA_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3333/auth/twitter/callback'
    },
    (token, tokenSecret, profile, done) => {
      passport.session.id = profile.id
      profile.twitter_token = token
      profile.twitter_token_secret = tokenSecret
      app.set('token', token)
      app.set('tokenSecret', tokenSecret)

      process.nextTick(() => {
        return done(null, profile)
      })
    }
  ))
}

module.exports = auth;
