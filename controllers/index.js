/**
 * Login page
 * @route GET /
 * @access Public
 */
const login = (req, res) => {
  res.render('login', { layout: 'login' });
};

/**
 * Dashboard page
 * @route GET /dashboard
 * @access Public
 */
const dashboard = (req, res) => {
  res.render('dashboard', { user: req.user });
};

module.exports = {
  login,
  dashboard,
};
