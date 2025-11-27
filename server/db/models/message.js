'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.Property, { foreignKey: 'propertyId' });
    }
  }
  Message.init({
    propertyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    propertyType: DataTypes.STRING,
    propertyPrice: DataTypes.STRING,
    propertyAddress: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};