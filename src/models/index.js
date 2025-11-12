const { Sequelize } = require('sequelize');
// const dbConfig = require('../config/config').development;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // optional: enable for SQL debugging
});

const Agent = require('./agent')(sequelize);
const File = require('./file')(sequelize);
const Alert = require('./alert')(sequelize);

// Associations
Agent.hasMany(Alert, { foreignKey: 'agentId' });
Alert.belongsTo(Agent, { foreignKey: 'agentId' });

Agent.hasMany(File, { foreignKey: 'agentId' });
File.belongsTo(Agent, { foreignKey: 'agentId' });

module.exports = { sequelize, Agent, File, Alert };
