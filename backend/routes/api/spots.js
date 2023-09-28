const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User } = require('../../db/models')
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

  res.status(200).json({ spots })
})



module.exports = router
