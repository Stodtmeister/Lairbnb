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
        stars: 5,
      },
      {
        userId: 2,
        spotId: 2,
        review: 'The house was only OK and it smelled weird...',
        stars: 3,
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
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
