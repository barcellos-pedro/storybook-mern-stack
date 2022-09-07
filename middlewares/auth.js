/**
 * Make sure authenticated user access some route
 */
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Allow to continue route callback
    return next();
  }
  res.redirect('/'); // Redirects to login page
};

/**
 * Make sure guest user access some route
 */
const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Allow to continue route callback
    return next();
  }
  res.redirect('/dashboard');
};

module.exports = { ensureAuth, ensureGuest };
