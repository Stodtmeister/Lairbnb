const router = require('express').Router();
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

validateBooking = [
  check('startDate').exists({ checkFalsy: true }).notEmpty()
    .withMessage('startDate is required'),
  check('endDate').exists({ checkFalsy: true }).notEmpty()
    .withMessage('endDate is required'),
  handleValidationErrors,
];

// Get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: {
      model: Spot,
      attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
    },
  });

  return res.status(200).json({ Bookings: bookings });
});

// Edit a booking
router.put('/:bookingId', requireAuth, validateBooking,
  [
    body('endDate').custom((value, { req }) => {
      const endDate = new Date(value);
      const startDate = new Date(req.body.startDate);
      if (startDate < endDate) return true;
      throw new Error('endDate cannot be on or before startDate');
    }),
    handleValidationErrors,
  ],
  async (req, res, next) => {
    const startingDate = Date.parse(req.body.startDate);
    const endingDate = Date.parse(req.body.endDate);
    const booking = await Booking.findByPk(req.params.bookingId, {
      include: { model: Spot, include: Booking },
    });

    if (!booking)
      return res.status(404).json({ message: "Booking couldn't be found" });
    const { spotId, userId, startDate, endDate, createdAt, updatedAt } = booking;

    // if (!authorization(booking, req.user, next)) return
    if (booking.userId !== req.user.id) {
      let err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Require proper authorization';
      return next(err);
    }

    const previousStart = Date.parse(booking.startDate);
    const previousEnd = Date.parse(booking.endDate);
    if (startingDate >= previousStart && endingDate <= previousEnd) {
      await booking.update(req.body);
      return res.status(200).json({ id: booking.id, spotId, userId, startDate, endDate, createdAt, updatedAt });
    }

    if (endingDate < Date.parse(new Date()))
      return res.status(403).json({ message: "Past bookings can't be modified" });

    const bookingData = { reserved: [] };
    booking.Spot.Bookings.forEach((ele) => {
      if (ele.dataValues.id !== booking.id)
        bookingData.reserved.push([ Date.parse(ele.startDate), Date.parse(ele.endDate) ]);
    });

    const response = {
      message: 'Sorry, this spot is already booked for the specified dates',
      errors: {},
    };

    for (let reserved of bookingData.reserved) {
      const [start, end] = reserved;
      if (startingDate >= start && startingDate <= end)
        response.errors.startDate = 'Start date conflicts with an existing booking';
      if (endingDate >= start && endingDate <= end)
        response.errors.endDate = 'End date conflicts with an existing booking';
      if (start > startingDate && end < endingDate)
        response.errors.overlap = 'Booking envelops an existing booking';
    }

    if (Object.keys(response.errors).length > 0)
      return res.status(403).json(response);

    await booking.update(req.body);
    return res.status(200).json({ id: booking.id, spotId, userId, startDate, endDate, createdAt, updatedAt });
  }
);

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId, { include: Spot });

  if (!booking)
    return res.status(404).json({ message: "Booking couldn't be found" });
  if (!authorization(booking, req.user, next, booking.Spot)) return;

  const startDate = Date.parse(booking.startDate);
  const endDate = Date.parse(booking.endDate);
  const todaysDate = Date.parse(new Date());
  if (startDate <= todaysDate && todaysDate <= endDate)
    return res.status(403).json({ message: "Bookings that have been started can't be deleted" });

  await booking.destroy();
  res.status(200).json({ message: 'Successfully deleted' });
});

function authorization(booking, user, next, spot) {
  if (booking.userId !== user.id && spot && spot.ownerId !== user.id) {
    let err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Require proper authorization';
    next(err);
    return false;
  }

  return true;
}

module.exports = router;
