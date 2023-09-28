const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image } = require('../../db/models')
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
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
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

  if (!spot) return res.status(404).json({ message: "Spot couldn't be found"})
  return res.status(200).json(spot)
})



module.exports = router
