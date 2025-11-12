const { Alert, Agent } = require('../models');
const logger = require('../utils/logger');

// Create an alert
exports.createAlert = async (req, res) => {
  try {
    const { agentId, filePath, changeType, oldHash, newHash } = req.body;

    // Ensure agent exists
    const agent = await Agent.findByPk(agentId);
    if (!agent) {
      return res.status(400).json({ error: 'Invalid agentId. Agent not registered.' });
    }

    const alert = await Alert.create({ agentId, filePath, changeType, oldHash, newHash });
    logger.info(`Alert created: ${changeType} - ${filePath} (agent ${agentId})`);
    res.json(alert);
  } catch (err) {
    logger.error('Failed to create alert:', err);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

// Get all alerts
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll({ include: Agent, order: [['timestamp', 'DESC']] });
    res.json(alerts);
  } catch (err) {
    logger.error('Failed to fetch alerts:', err);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};
