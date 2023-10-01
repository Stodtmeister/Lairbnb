const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth')

validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Price per day is required'),
  handleValidationErrors
]

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

// Create a spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  try {
    const ownerId = req.user.id
    const newSpot = await Spot.create({ ownerId, ...req.body})
    res.status(201).json(newSpot)
  } catch(error) {
    next(error)
  }
})

// Add an image to a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found"})
  authorization(spot, req.user, next)

  const imageableId = Number(req.params.spotId)
  const imageableType = 'Spot'
  const newImage = await Image.create({ imageableId, imageableType, ...req.body })
  const { id, url, preview } = newImage

  return res.status(200).json({ id, url, preview })
})

// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found"})
  authorization(spot, req.user, next)

  const updatedSpot = await spot.update(req.body)
  return res.status(200).json(updatedSpot)
})

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })
  authorization(spot, req.user, next)

  await spot.destroy()
  return res.status(200).json({ message: 'Successfully deleted' })
})

// Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

  const reviews = await Review.findAll({
    where : { spotId: req.params.spotId },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Image, as: 'ReviewImages', attributes: ['id', 'url'] }
    ]
  })

  return res.status(200).json({ Reviews: reviews })
})

function authorization(spot, user, next) {
  if (spot.ownerId !== user.id) {
    let err = new Error('Forbidden')
    err.status = 403
    err.title = 'Require proper authorization'
    next(err)
  }
}

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
