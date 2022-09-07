const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.ensureGuest, indexController.login);
router.get('/dashboard', authMiddleware.ensureAuth, indexController.dashboard);

module.exports = router;
