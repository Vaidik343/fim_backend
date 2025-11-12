const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('File', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    path: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING },
    size: { type: DataTypes.BIGINT },
    modifiedAt: { type: DataTypes.DATE }
  });
};
