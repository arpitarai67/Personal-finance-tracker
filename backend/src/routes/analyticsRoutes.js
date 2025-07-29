const express = require('express');
const router = express.Router();

const { getAnalytics } = require('../controllers/analyticsController');
const protect = require('../middlewares/authMiddleware');

router.use(protect);
router.get('/', getAnalytics);

module.exports = router;
