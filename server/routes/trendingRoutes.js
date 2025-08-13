const express = require('express');
const { getTrendingMetrics, updateTrendingMetrics } = require('../controllers/trendingController');
const router = express.Router();

router.get('/', getTrendingMetrics);
router.post('/', updateTrendingMetrics);

module.exports = router;