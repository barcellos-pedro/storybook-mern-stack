/**
 * Authentication with Google
 *
 * Successful authentication, redirect to home
 *
 * @route GET /auth/google/callback
 * @access Public
 */
const login = (req, res) => {
  res.redirect('/dashboard');
};

/**
 * Logout user with logout method from Passport middleware.
 * And then redirects to login page
 *
 * @route GET /auth/logout
 * @access Public
 */
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = {
  login,
  logout,
};
