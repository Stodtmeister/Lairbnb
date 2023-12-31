'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Review.hasMany(models.Image, {
        as: 'ReviewImages',
        foreignKey: 'imageableId',
        constraints: false,
        scope: { imageableType: 'Review' }
      })
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [5, 500] }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [ [1, 2, 3, 4, 5] ]}
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
