'use strict';

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        review: 'This place was pretty great!',
        stars: 1,
      },
      {
        userId: 4,
        spotId: 2,
        review: 'They provided excellent food. The salted pork was particularly nice.',
        stars: 5,
      },
      {
        userId: 3,
        spotId: 2,
        review: 'The fireworks were great. The Longbottom Leaf was better!',
        stars: 5,
      },
      {
        userId: 1,
        spotId: 2,
        review: '17 days was far too short a time to live among such excellent and admirable Hobbits!',
        stars: 5,
      },
      {
        userId: 3,
        spotId: 3,
        review: 'This place was great if you like living in a city.',
        stars: 4,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
