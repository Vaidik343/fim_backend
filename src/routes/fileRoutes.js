const express = require('express');
const router = express.Router();
const { upsertFile } = require('../controllers/fileController');

router.post('/files', upsertFile);
module.exports = router;
