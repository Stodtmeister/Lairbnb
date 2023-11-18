'use strict';

const { Image } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
      //! --------------- spot 1 -------------
      {
        imageableType: 'Spot',
        imageableId: 1,
        url: 'https://google.com'
      },
      //! --------------- spot 2 -------------
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://source.unsplash.com/zeW9BQbWmJs',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://source.unsplash.com/joHhAjbmRcw',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://source.unsplash.com/7VHb2vO2r18',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://source.unsplash.com/iX4xYJ_RLHM',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 2,
        url: 'https://source.unsplash.com/v0VBikgi-Ac',
        preview: false
      },
      //! --------------- spot 3 -------------
      {
        imageableType: 'Review',
        imageableId: 1,
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
        imageableType: 'Review',
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
