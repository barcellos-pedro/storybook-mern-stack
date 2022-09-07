const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.login
);

router.get('/logout', authController.logout);

module.exports = router;
