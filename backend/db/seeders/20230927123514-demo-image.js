'use strict';

const { Image } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        imageableType: 'Review',
        imageableId: 1,
        url: 'https://google.com',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://google.com',
        preview: true
      },
      {
        imageableType: 'Review',
        imageableId: 2,
        url: 'https://google.com',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 1,
        url: 'https://google.com'
      },
      {
        imageableType: 'Review',
        imageableId: 2,
        url: 'https://google.com'
      },
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://google.com'
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://google.com'] }
    }, {});
  }
};
