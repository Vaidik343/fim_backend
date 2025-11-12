const express = require('express');
const router = express.Router();
const { createAlert, getAlerts } = require('../controllers/alertController');

router.post('/alerts', createAlert);
router.get('/alerts', getAlerts);

module.exports = router;
