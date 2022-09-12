const express = require(`express`);
const router = express.Router();
const { ensureAuth } = require('../middlewares/auth');
const storiesController = require('../controllers/stories');

router.get('/', ensureAuth, storiesController.publicStories);

router
  .route('/add')
  .get(ensureAuth, storiesController.addPage)
  .post(ensureAuth, storiesController.create);

router
  .route('/edit/:id')
  .get(ensureAuth, storiesController.editPage)
  .put(ensureAuth, storiesController.edit);

router.delete('/delete/:id', ensureAuth, storiesController.deleteStory);

router.get('/:id', ensureAuth, storiesController.storyPage)

module.exports = router;
