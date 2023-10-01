const router = require('express').Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Image, Review } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth')

// router.get('/current', requireAuth, async (req, res, next) => {
//   const { user: currentUser } = req

//   const reviews = await Review.findAll({
//     where: { userId: currentUser.id }
//   })

//   return res.json({ reviews })


// })

// if (!review) return res.status(404).json({ message: "Spot couldn't be found"})
// authorization(review, req.user, next)
module.exports = router
