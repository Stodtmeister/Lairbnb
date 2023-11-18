'use strict';

const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define the schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Meadow Lane',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 12.4,
        lng: 7.3,
        name: 'Tree House',
        description: 'This is a house in a tree',
        price: 999,
        previewImage: 'https://source.unsplash.com/2MA8dFvOMec'
      },
      {
        ownerId: 2,
        address: '1 Bagshot Row',
        city: 'Hobbiton',
        state: 'Shire',
        country: 'Middle-earth',
        lat: 29.56,
        lng: 32.1,
        name: 'Bag End',
        description: 'In a hole in the ground there lived a hobbit',
        price: 7000,
        previewImage: 'https://source.unsplash.com/zeW9BQbWmJs'
      },
      {
        ownerId: 3,
        address: '99 Alcatraz blvd',
        city: 'SanFrancisco',
        state: 'California',
        country: 'United States',
        lat: 63.1,
        lng: 10.7,
        name: 'Alcatraz prison',
        description: 'Literally Alcatraz prison.',
        price: 93,
        previewImage: 'https://source.unsplash.com/eWqOgJ-lfiI',
      },
      {
        ownerId: 4,
        address: 'Somewhere secret',
        city: 'Minas Tirith',
        state: 'Gondor',
        country: 'Middle-earth',
        lat: 66,
        lng: 18.7,
        name: 'The White City',
        description: 'The throne room',
        price: 533,
        previewImage: 'https://source.unsplash.com/0yfWDwHOB0g',
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Alcatraz prison', 'Tree House', 'Skyscraper']}
    }, {})
  }
};
