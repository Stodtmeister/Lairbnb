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
        lat: 123.4,
        lng: 748.3,
        name: 'Tree House',
        description: 'This is a house in a tree',
        price: 999,
        avgRating: 5.0,
        previewImage: 'https://lairbnb.com'
      },
      {
        ownerId: 2,
        address: '599 W Cat Dr',
        city: 'New York City',
        state: 'New York',
        country: 'United States',
        lat: 29.56,
        lng: 7892.1,
        name: 'Skyscraper',
        description: 'The Flatiron Building',
        price: 1000000,
        avgRating: 4.5,
        previewImage: 'https://lairbnb.com'
      },
      {
        ownerId: 3,
        address: '99 Alcatraz blvd',
        city: 'SanFrancisco',
        state: 'California',
        country: 'United States',
        lat: 63.1,
        lng: 100.7,
        name: 'Alcatraz prison',
        description: 'Literally Alcatraz prison.',
        price: '7',
        avgRating: 1.3,
        previewImage: 'https://lairbnb.com'
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Alcatraz prison', 'Tree House', 'Skyscraper']}
    }, {})
  }
};
