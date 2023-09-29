const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review, sequelize } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth')

router.get('/', async (req, res) => {
  const spots = await Spot.findAll()
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



module.exports = router
