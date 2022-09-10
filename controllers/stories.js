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

/**
 * Show public stories from all users
 * @route GET /stories
 * @access Private
 */
const publicStories = async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user') // include User ref data
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', { stories });
  } catch (error) {
    res.render('error/500');
  }
};

module.exports = {
  add,
  create,
  publicStories,
};
