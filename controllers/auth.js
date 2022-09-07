/**
 * Authentication with Google
 *
 * Successful authentication, redirect to home
 * @route GET /auth/google/callback
 * @access Public
 */
const auth = (req, res) => {
  res.redirect('/dashboard');
};

module.exports = {
  auth,
};
