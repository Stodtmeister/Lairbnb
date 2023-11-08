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
        previewImage: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.alleycat.org%2Fwp-content%2Fuploads%2F2019%2F03%2FFELV-cat.jpg&tbnid=3I8uGDvVBXvNOM&vet=1&imgrefurl=https%3A%2F%2Fwww.alleycat.org%2Fresources%2Fthe-natural-history-of-the-cat%2F&docid=9rMsr632qCnewM&w=703&h=463&source=sh%2Fx%2Fim%2Fm5%2F1&shem=uvafe2'
      },
      {
        ownerId: 2,
        address: '599 W Cat Dr',
        city: 'New York City',
        state: 'New York',
        country: 'United States',
        lat: 29.56,
        lng: 32.1,
        name: 'Skyscraper',
        description: 'The Flatiron Building',
        price: 1000000
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
        price: '7'
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
