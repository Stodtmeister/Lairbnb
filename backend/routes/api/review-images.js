const router = require('express').Router();
const { Spot, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Delete a review image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const image = await Image.findByPk(req.params.imageId, { include: Spot });

  if (!image) return res.status(404).json({ message: "Spot Image couldn't be found" })

  //? (Weird authorization error) authorization(image.Spot, req.user, next)
  if (req.user.id !== image.Spot.ownerId) {
    let err = new Error('Forbidden')
    err.status = 403
    return next(err)
  }

  await image.destroy()
  return res.status(200).json({ message: 'Successfully deleted' })
})

module.exports = router;
