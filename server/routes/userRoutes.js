const express = require('express');
const { addFavourite, getUserInfo } = require('../controllers/userController')
const authenticateToken = require('../middleware/auth')
const router = express.Router();

router.get('/', authenticateToken, getUserInfo)
router.post('/favourites', authenticateToken, addFavourite);

module.exports = router;