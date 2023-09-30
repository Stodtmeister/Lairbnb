const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review, sequelize } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth')


router.get('/', async (req, res) => {
  const spots = await Spot.findAll(
    {include: [{ model: Review }, { model: Image }] }
  )


  const updatedSpots = getAvgRating(spots)
  return res.json({ Spots: updatedSpots})
  return res.status(200).json({ spots })
})

router.get('/current', requireAuth, async (req, res) => {
  const { user: currentUser } = req
  const spots = await Spot.findAll({
    where: { ownerId: currentUser.id }
  })


  return res.status(200).json({ spots })
})

router.get('/:spotId', async (req, res) => {

  const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body

  const numberOfReviews = await Review.count({
    where: { id: Number(req.params.spotId) }
  })

  const updatedSpot = {}



  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      exclude: ['avgRating', 'previewImage'],
    },
    include: [
      // {
      //   model: Review,
      //   attributes: {
      //     include: [
      //       [sequelize.fn('COUNT', sequelize.col('review')), 'numReviews']
      //     ]
      //   }
      // },
      {
        model: Image, as: 'SpotImages',
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User, as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })

  // let review = await spot.getReviews()
  // review = review.length

  // spot.dataValues.numReviews = numberOfReviews
  // console.log(spot)

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found"})
  return res.status(200).json(review)
})

function getAvgRating(arr) {
  const newArr = []

  for (let spot of arr) {
    let count = 0
    let totalStars = 0
    let previewImage
    let avgRating

    for (let review of spot.Reviews) {
      count++
      totalStars += review.stars
    }

    for (let images of spot.Images) {
      if (images.preview === true) {
        preview = images.url
        // spot.dataValues.previewImage = images.url
        break
      }

      previewImage = 'Upload preview image'
      // spot.dataValues.previewImage = 'Upload preview image'
    }

    avgRating = totalStars / count
    // spot.dataValues.avgRating = totalStars / count
    const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = spot
    newArr.push({ id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt, avgRating, previewImage })
  }

  return newArr
}



module.exports = router
