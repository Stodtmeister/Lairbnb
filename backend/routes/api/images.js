const router = require('express').Router()
const { Spot, User, Image } = require('../../db/models')

router.get('/:id', async (req, res) => {
  const images = await Image.findByPk(req.params.id)
  const imageable = await images.getImageable()


  console.log('IMG:', imageable)
  res.json(imageable)
})

module.exports = router
