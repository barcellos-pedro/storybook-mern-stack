const Story = require('../models/Story');

/**
 * Create Story page
 * @route GET /stories/add
 * @access Private
 */
const add = async (req, res) => {
  res.render('stories/add');
};

/**
 * Create Story
 * @route POST /stories/add
 * @access Private
 */
const create = async (req, res) => {
  try {
    await Story.create({ ...req.body, user: req.user._id });
    res.redirect('/dashboard');
  } catch (error) {
    res.render('error/500');
  }
};

module.exports = {
  add,
  create,
};
