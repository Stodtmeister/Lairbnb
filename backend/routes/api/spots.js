const router = require('express').Router()
const { check, body} = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review, Booking } = require('../../db/models')
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

validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('startDate is required'),
  check('endDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('endDate is required'),
  handleValidationErrors
]

validateQuery = [
  check("page")
    .default(1)
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .default(20)
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be greater than or equal to 1"),
  check("minLat")
    .optional()
    .isFloat({ min: -90 })
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .isFloat({ max: 90 })
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .isInt({ min: -180})
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .isInt({ max: 180 })
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .isInt({ min: 0})
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .isInt({ min: 0})
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors
]

// Get all spots
router.get('/', validateQuery, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
  let query = { where: {} }

  // page = page ? 1 : Number(page)
  // size = size ? 20 : Number(size)
  query.where.lat = minLat ? { [Op.gte]: Number(minLat) } : null
  query.where.lat = maxLat ? { [Op.lte]: Number(maxLat) } : null
  query.where.lng = minLng ? { [Op.gte]: Number(minLng) } : null
  query.where.lng = maxLng ? { [Op.lte]: Number(maxLng) } : null
  query.where.price = minPrice ? { [Op.gte]: Number(minPrice) } : null
  query.where.price = maxPrice ? { [Op.lte]: Number(maxPrice) } : null

  query.limit = size
  query.offset = size * (page - 1)

  // if ((page >= 1 && page <= 10) && (size >= 1 && size <= 20)) {
  // }

  const spots = await Spot.findAll({
    ...query,
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

// Create a review for a spot based on the spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

  const reviewedPreviously = await Review.findOne({
    where: {
      spotId: req.params.spotId,
      userId: req.user.id,
    }
  })

  if (reviewedPreviously) return res.status(500).json({ message: "User already has a review for this spot"})

  const userId = req.user.id
  const spotId = req.params.spotId
  const review = await Review.create({ userId, spotId, ...req.body })
  return res.status(201).json(review)
})

// Get all bookings for a spot based on the spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found"})

  if (spot.dataValues.ownerId === req.user.id) {
    const notOwner = await spot.getBookings({
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
    res.status(200).json({ Bookings: notOwner })
  } else {
    const isOwner = await spot.getBookings({ attributes: ['spotId', 'startDate', 'endDate'] })
    res.status(200).json({ Bookings: isOwner })
  }
})

// Create a booking from a spot based on the spot's id
router.post('/:spotId/bookings',
  [
    body('endDate').custom((value, { req }) => {
      const endDate = new Date(value);
      const startDate = new Date(req.body.startDate);
      if (startDate < endDate) return true;
      throw new Error('endDate cannot be on or before startDate')
    }),
    handleValidationErrors
  ],
  requireAuth, validateBooking, async (req, res) => {
    const startDate = Date.parse(req.body.startDate)
    const endDate = Date.parse(req.body.endDate)

    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    const bookings = await spot.getBookings();

    const bookingData = { reserved: [] }
    bookings.forEach(booking => {
      bookingData.reserved.push([Date.parse(booking.startDate), Date.parse(booking.endDate)])
    })

    const response = {
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {}
    }

    for (let reserved of bookingData.reserved) {
      const [ start, end ]  = reserved

      if (startDate >= start && startDate <= end) {
        response.errors.startDate = 'Start date conflicts with an existing booking'
      }
      if (endDate >= start && endDate <= end) {
        response.errors.endDate = 'End date conflicts with an existing booking'
      }
    }

    if (Object.keys(response.errors).length > 0) return res.status(403).json(response)

    const userId = req.user.id
    const spotId = req.params.spotId
    const booking = await Booking.create({ spotId, userId, ...req.body })
    return res.status(200).json(booking)
  }
);

// Delete a spot image
router.delete('/:spotId/images/:imageId', requireAuth, async (req, res, next) => {
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

function authorization(spot, user, next) {
  if (spot.ownerId !== user.id) {
    let err = new Error('Forbidden')
    err.status = 403
    // err.title = 'Require proper authorization'
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
