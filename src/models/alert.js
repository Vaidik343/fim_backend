const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Alert', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    filePath: { type: DataTypes.STRING, allowNull: false },
    changeType: { type: DataTypes.STRING }, // added, modified, deleted
    oldHash: { type: DataTypes.STRING },
    newHash: { type: DataTypes.STRING },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
};
