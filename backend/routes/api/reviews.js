const router = require('express').Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

validateReview = [
  check('review').exists({ checkFalsy: true }).notEmpty()
    .withMessage('Review text is required'),
  check('stars').exists({ checkFalsy: true }).notEmpty().isIn([1, 2, 3, 4, 5])
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors,
];

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

  if (!reviews)
    return res.status(404).json({ message: 'No reviews yet' });
  return res.status(200).json({ Reviews: reviews });
});

// Add an image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId, {
    include: { model: Image, as: 'ReviewImages', attributes: [] },
    attributes: [ 'userId', [sequelize.fn('COUNT', sequelize.col('ReviewImages.id')), 'imageCount'] ],
  });

  if (!review)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (!authorization(review, req.user, next))
    return;

  const imageCount = review.dataValues.imageCount;
  if (imageCount >= 10)
    return res.status(403).json({ message: 'Maximum number of images for this resource was reached' });

  const imageableType = 'Review';
  const imageableId = req.params.reviewId;
  const image = await Image.create({ imageableType, imageableId, ...req.body });
  const { id, url } = image;
  return res.status(200).json({ id, url });
});

// Edit a review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (!authorization(review, req.user, next))
    return;

  const updatedReview = await review.update(req.body);
  return res.json(updatedReview);
});

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review)
    return res.status(404).json({ message: "Review couldn't be found" });
  if (!authorization(review, req.user, next))
    return;

  await review.destroy();
  return res.status(200).json({ message: 'Successfully deleted' });
});

function authorization(review, user, next) {
  if (review.userId !== user.id) {
    let err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Require proper authorization';
    next(err);
    return false;
  }

  return true;
}

module.exports = router;
