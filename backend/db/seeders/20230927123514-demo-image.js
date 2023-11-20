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
      //! --------------- spot 4 -------------
      {
        imageableType: 'Spot',
        imageableId: 4,
        url: 'https://source.unsplash.com/0yfWDwHOB0g',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 4,
        url: 'https://source.unsplash.com/Bi8yaj053S4',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 4,
        url: 'https://source.unsplash.com/GM7cm1IC6Ss',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 4,
        url: 'https://source.unsplash.com/2J6mcH1QxSg',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 4,
        url: 'https://source.unsplash.com/23fOdH9Zrwc',
        preview: false
      },
      //! --------------- spot 5 -------------
      {
        imageableType: 'Spot',
        imageableId: 5,
        url: 'https://source.unsplash.com/fsUVFq7hUgg',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 5,
        url: 'https://source.unsplash.com/mx4mSkK9zeo',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 5,
        url: 'https://source.unsplash.com/AQl-J19ocWE',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 5,
        url: 'https://source.unsplash.com/MP0bgaS_d1c',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 5,
        url: 'https://source.unsplash.com/YpijqdEGXR0',
        preview: false
      },
      //! --------------- spot 6 -------------
      {
        imageableType: 'Spot',
        imageableId: 6,
        url: 'https://source.unsplash.com/F4zubUaI24w',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 6,
        url: 'https://source.unsplash.com/EPPbKZPN0rU',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 6,
        url: 'https://source.unsplash.com/iANAdaNu7mg',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 6,
        url: 'https://source.unsplash.com/l55oxs-iziM',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 6,
        url: 'https://source.unsplash.com/umAXneH4GhA',
        preview: false
      },
      //! --------------- spot 7 -------------
      {
        imageableType: 'Spot',
        imageableId: 7,
        url: 'https://source.unsplash.com/nkOLtHRZpGQ',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 7,
        url: 'https://source.unsplash.com/NTaF5rBmlyE',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 7,
        url: 'https://source.unsplash.com/2J6mcH1QxSg',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 7,
        url: 'https://source.unsplash.com/hCU4fimRW-c',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 7,
        url: 'https://source.unsplash.com/XAHSexPxSus',
        preview: false
      },
      //! --------------- spot 8 -------------
      {
        imageableType: 'Spot',
        imageableId: 8,
        url: 'https://source.unsplash.com/XJnP4L958ds',
        preview: true
      },
      {
        imageableType: 'Spot',
        imageableId: 8,
        url: 'https://source.unsplash.com/F9cDk61pBbM',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 8,
        url: 'https://source.unsplash.com/EZERpkl3Lso',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 8,
        url: 'https://source.unsplash.com/KSfe2Z4REEM',
        preview: false
      },
      {
        imageableType: 'Spot',
        imageableId: 8,
        url: 'https://source.unsplash.com/atR8TlgdGVY',
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
