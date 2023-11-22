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
        description: 'Tree house in downtown Chicago',
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
        description: 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
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
        description: 'Cell #62 in Alcatraz prison.',
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
      {
        ownerId: 1,
        address: '45 S 5000 W',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: 66,
        lng: 18.7,
        name: 'Mansion',
        description: 'A big house',
        price: 533,
        previewImage: 'https://source.unsplash.com/fsUVFq7hUgg',
      },
      {
        ownerId: 2,
        address: '87th Main St',
        city: 'Boise',
        state: 'Idaho',
        country: 'United States',
        lat: 66,
        lng: 18.7,
        name: 'Farm',
        description: 'A farm house in Idaho',
        price: 19,
        previewImage: 'https://source.unsplash.com/F4zubUaI24w',
      },
      {
        ownerId: 3,
        address: '98 Moon Blvd',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: 66,
        lng: 18.7,
        name: 'Shack',
        description: 'A cozy shack',
        price: 1000,
        previewImage: 'https://source.unsplash.com/nkOLtHRZpGQ',
      },
      {
        ownerId: 4,
        address: '99 Pelican Way',
        city: 'Orlando',
        state: 'Florida',
        country: 'United States',
        lat: 66,
        lng: 18.7,
        name: 'Beach House',
        description: 'A beach house in Orlando',
        price: 533,
        previewImage: 'https://source.unsplash.com/XJnP4L958ds',
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
