const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

/**
 * Callback which receives the access token and
 * optional refresh token, as well as profile
 * which contains the authenticated user's Google profile.
 * The verify callback must call cb providing a user to complete authentication.
 *
 * @see https://www.passportjs.org/packages/passport-google-oauth20
 */
const verify = async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  // await User.findOrCreate({ googleId: profile.id }, (err, user) => {
  //   return cb(err, user);
  // });
};

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

const strategy = new GoogleStrategy(options, verify);

const usePassport = (passport) => {
  passport.use(strategy);

  // Serialization and Deserialization
  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });
};

module.exports = { usePassport };
