const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const spots = await Spot.findAll()
  return res.status(200).json({ spots })
})



module.exports = router
