const router = require('express').Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
  console.log('hi')
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: {
      model: Spot,
      attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
    }
  })

  return res.status(200).json({ Bookings: bookings })
})

module.exports = router
