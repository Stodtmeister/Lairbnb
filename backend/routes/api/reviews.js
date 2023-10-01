const router = require('express').Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Image, as: 'ReviewImages', attributes: ['id', 'url'] },
    ],
  });

  return res.status(200).json({ Reviews: reviews });
});

// Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const reviews = await Review.findAll({
    where : { spotId: req.params.spotId },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Image, as: 'ReviewImages', attributes: ['id', 'url'] }
    ]
  })

  if (!reviews) return res.status(404).json({ message: "Spot couldn't be found" })
  return res.status(200).json({ Reviews: reviews })
})


module.exports = router;
