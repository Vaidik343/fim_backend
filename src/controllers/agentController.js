const { Agent } = require('../models');
const logger = require('../utils/logger');

// Register or return existing agent
exports.registerAgent = async (req, res) => {
  try {
    const { name,  os, ip } = req.body;

    // Check if agent already exists by hostname
    let agent = await Agent.findOne({ where: { name } });
    if (!agent) {
      agent = await Agent.create({ name,  os, ip });
      logger.info(`New agent registered: ${name} (${agent.id})`);
    } else {
      logger.info(`Agent already registered: ${name} (${agent.id})`);
    }

    res.json({ agentId: agent.id });
  } catch (err) {
    logger.error('Agent registration failed:', err);
    res.status(500).json({ error: 'Failed to register agent' });
  }
};

// Get all registered agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.findAll();
    res.json(agents);
  } catch (err) {
    logger.error('Failed to fetch agents:', err);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};
