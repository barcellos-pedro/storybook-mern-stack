const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

/**
 * Callback which receives the access token, optional refresh token, as well as profile
 * which contains the authenticated user's Google profile.
 *
 * The verify must use a callback to provide a user to complete authentication.
 * cb(null, user) or
 * cb(error) for error cases
 *
 * @see https://www.passportjs.org/packages/passport-google-oauth20
 */
const verify = async (accessToken, refreshToken, profile, cb) => {
  try {
    let foundUser = await User.findOne({ googleId: profile.id });

    if (foundUser) {
      return cb(null, foundUser);
    }

    const newUser = await User.create({
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    });

    return cb(null, newUser);
  } catch (error) {
    console.error(error);
    return cb(error);
  }
};

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

const strategy = new GoogleStrategy(options, verify);

const usePassport = (passport) => {
  passport.use(strategy);

  // Serialization
  passport.serializeUser((user, cb) => {
    // Every time the event loop takes a full trip, we call it a tick.
    // Invoke the callback function at the end of the current operation, before the next event loop tick starts
    process.nextTick(() => {
      cb(null, user);
    });
  });

  // Deserialization
  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, user);
    });
  });
};

module.exports = { usePassport };
