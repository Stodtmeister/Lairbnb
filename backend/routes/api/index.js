const router = require('express').Router()

//router.uses for all of the individual routers for the different resources.

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router
