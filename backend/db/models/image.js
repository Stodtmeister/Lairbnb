'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null)
      const myCustomFunctionName = `get${this.imageableType}`
      return this[myCustomFunctionName](options)
    }

    static associate(models) {
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false
      });
    }
  }
  Image.init({
    imageableType: {
      type: DataTypes.ENUM('Review', 'Spot')
    },
    imageableId: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
