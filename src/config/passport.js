const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/index');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await db.User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          user = await db.User.findOne({ where: { email: profile.emails[0].value } });

          if (!user) {
            user = await db.User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              username: profile.displayName,
              isConfirmed: true,
            });
          } else {
            user.googleId = profile.id;
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  db.User.findByPk(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

module.exports = passport;