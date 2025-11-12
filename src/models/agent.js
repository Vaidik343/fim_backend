const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Agent', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    os: { type: DataTypes.STRING },
    ip: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'active' }
  });
};
