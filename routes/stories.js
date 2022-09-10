const express = require(`express`);
const router = express.Router();
const { ensureAuth } = require('../middlewares/auth');
const storiesController = require('../controllers/stories');

router.get(`/add`, ensureAuth, storiesController.add);

module.exports = router;
