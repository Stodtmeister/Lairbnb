'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { notEmpty: true, isDate: true }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { notEmpty: true, isDate: true }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
