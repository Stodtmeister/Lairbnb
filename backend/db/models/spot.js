'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { as: 'Owner', foreignKey: 'ownerId' })
      Spot.hasMany(models.Review, { foreignKey: 'spotId' })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' })
      Spot.hasMany(models.Image, {
        as: 'SpotImages',
        foreignKey: 'imageableId',
        constraints: false,
        scope: { imageableType: 'Spot' },
      })
    }
  }
  Spot.init({
    ownerId: { type: DataTypes.INTEGER },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [10, 100] }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [2, 11] }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [2, 56] }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true, isFloat: true, min: -90, max: 90 }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true, isFloat: true, min: -180, max: 180 }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [1, 49] }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true, isInt: true, min: 0 }
    },
    previewImage: { type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
