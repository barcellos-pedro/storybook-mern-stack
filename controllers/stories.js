/**
 * Create Story page
 * @route GET /stories/add
 * @access Private
 */
const add = async (req, res) => {
  res.render('stories/add');
};

module.exports = {
  add,
};
