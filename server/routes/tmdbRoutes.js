const express = require('express');
const router = express.Router();
const { popular, search, details } = require('../controllers/movieController');

router.get('/popular', popular);
router.get('/search', search);
router.get('/details', details);

module.exports = router;
