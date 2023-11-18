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
        url: 'https://source.unsplash.com/2MA8dFvOMec',
        preview: true,
      },
      {
        imageableType: 'Spot',
        imageableId: 1,
        url: 'https://source.unsplash.com/ylyn5r4vxcA',
        preview: false,
      },
      {
        imageableType: 'Spot',
        imageableId: 1,
        url: 'https://source.unsplash.com/2gDwlIim3Uw',
        preview: false,
      },
      {
        imageableType: 'Spot',
        imageableId: 1,
        url: 'https://source.unsplash.com/UpAX8YLpRBM',
        preview: false,
      },
      {
        imageableType: 'Spot',
        imageableId: 1,
        url: 'https://source.unsplash.com/HQCW1gTMjek',
        preview: false,
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
        imageableType: 'Spot',
        imageableId: 3,
        url: 'https://source.unsplash.com/eWqOgJ-lfiI',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 3,
        url: 'https://source.unsplash.com/z99iWocuDt0',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 3,
        url: 'https://source.unsplash.com/XCWTQlmPO2I',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 3,
        url: 'https://source.unsplash.com/EbivdbB83Y0',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 3,
        url: 'https://source.unsplash.com/CMejBwGAdGk',
        preview: false
      },

      //! --------------- review imgs -------------
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
