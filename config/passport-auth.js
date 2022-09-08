const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

/**
 * Callback which receives the access token, optional refresh token, as well as profile
 * which contains the authenticated user's Google profile.
 *
 * The verify must use a callback to provide a user to complete authentication.
 *
 * @see https://www.passportjs.org/packages/passport-google-oauth20
 */
const verify = async (accessToken, refreshToken, profile, cb) => {
  try {
    let foundUser = await User.findOne({ googleId: profile.id });

    if (foundUser) {
      cb(null, foundUser);
      return;
    }

    const newUser = await User.create({
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    });

    cb(null, newUser);
  } catch (error) {
    console.error(error);
    throw new Error(error);
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
