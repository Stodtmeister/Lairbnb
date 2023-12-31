const router = require('express').Router();
const { Review, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Delete a review image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const image = await Image.findByPk(req.params.imageId, { include: Review });

  if (!image)
    return res.status(404).json({ message: "Review Image couldn't be found" });
    
  if (req.user.id !== image.Review.dataValues.userId) {
    let err = new Error('Forbidden');
    err.title = 'Require proper authorization';
    err.status = 403;
    return next(err);
  }

  await image.destroy();
  return res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = router;
