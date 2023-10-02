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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (!review) return res.status(404).json({ message: "Review couldn't be found" })
  authorization(review, req.user, next)

  const imageableType = 'Review'
  const imageableId = req.user.id
  const image = await Image.create({ imageableType, imageableId, ...req.body})

  const { id, url } = image
  return res.status(200).json({ id, url })
})

function authorization(review, user, next) {
  if (review.userId !== user.id) {
    let err = new Error('Forbidden')
    err.status = 403
    err.title = 'Require proper authorization'
    next(err)
  }
}

module.exports = router;
