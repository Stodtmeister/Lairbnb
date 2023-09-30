const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review, sequelize } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth')

// Get all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: Image, as: 'SpotImages' }]
  })

  const updatedSpots = getAvgRating(spots)
  return res.status(200).json({ Spots: updatedSpots})
})

// Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { user: currentUser } = req
  const spots = await Spot.findAll({
    where: { ownerId: currentUser.id },
    include: [{ model: Review }, { model: Image, as: 'SpotImages' }]
  })

  const updatedSpots = getAvgRating(spots)
  return res.status(200).json({ Spots: updatedSpots })
})

// Get details of a spot from an id
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Image, as: 'SpotImages',
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User, as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      { model: Review }
    ]
  })

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found"})
  const updatedSpots = getAvgRating([spot])
  return res.status(200).json(updatedSpots)
})

function getAvgRating(arr) {
  return arr.map((spot) => {
    let count = 0
    let totalStars = 0
    let previewImage
    let avgRating

    for (let review of spot.Reviews) {
      count++
      totalStars += review.stars
    }

    if (!spot.SpotImages.length) {
      previewImage = 'Upload preview image'
    } else {
      for (let images of spot.SpotImages) {
        if (images.preview === true) {
          previewImage = images.url
          break
        }
      }
      previewImage = 'Upload preview image'
    }

    avgRating = totalStars / count
    let numReviews = count
    let avgStarRating = avgRating
    const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, SpotImages, Owner } = spot
    if (Owner) return { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, numReviews, avgStarRating, SpotImages, Owner }
    return { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, avgRating, previewImage }
  })
}



module.exports = router
