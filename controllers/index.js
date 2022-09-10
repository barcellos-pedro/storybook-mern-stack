const Story = require('../models/Story');

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
const dashboard = async (req, res) => {
  try {
    // Find stories based on current logged in user '_id'
    // lean() to render data on handlerbars as js objects, not documents
    const stories = await Story.find({ user: req.user._id }).lean();
    res.render('dashboard', { user: req.user, stories });
  } catch (error) {
    res.render('error/500');
  }
};

module.exports = {
  login,
  dashboard,
};
