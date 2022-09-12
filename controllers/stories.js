const Story = require('../models/Story');

/**
 * Create Story page
 * @route GET /stories/add
 * @access Private
 */
const addPage = async (req, res) => {
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

/**
 * Edit Story page
 * @route GET /stories/edit/:id
 * @access Private
 */
const editPage = async (req, res) => {
  try {
    // lean() to render data on handlerbars as js objects, not documents
    const story = await Story.findById(req.params.id).lean();

    if (!story) {
      res.render('error/404');
      return;
    }

    // make sure logged user can only edit its stories
    if (story.user.toString() !== req.user._id) {
      res.render('error/403');
      return;
    }

    res.render('stories/edit', { story });
  } catch (error) {
    res.render('error/500');
  }
};

/**
 * Edit Story page
 * @route PUT /stories/edit/:id
 * @access Private
 */
const edit = async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await Story.findById(storyId).lean();

    if (!story) {
      res.render('error/404');
      return;
    }

    if (story.user.toString() !== req.user._id) {
      res.render('error/403');
      return;
    }

    await Story.findByIdAndUpdate(storyId, { ...req.body });

    res.redirect('/dashboard');
  } catch (error) {
    res.render('error/500');
  }
};

module.exports = {
  addPage,
  create,
  publicStories,
  editPage,
  edit,
};
