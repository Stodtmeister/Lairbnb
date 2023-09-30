'use strict';

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2024, 1, 20),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(2025, 11, 5),
        endDate: new Date(2025, 11, 12),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date(2023, 12, 4),
        endDate: new Date(2023, 12, 6),
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
