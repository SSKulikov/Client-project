'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      propertyId: {
        type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'id'
      }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      propertyAddress: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyPrice: { 
      type: DataTypes.STRING,
      allowNull: false
    },
      propertyType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};