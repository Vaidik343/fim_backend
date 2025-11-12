const express = require('express');
const router = express.Router();
const { registerAgent, getAgents } = require('../controllers/agentController');

router.post('/agents/register', registerAgent);
router.get('/agents', getAgents);

module.exports = router;
