const router = require('express').Router()
// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

//router.uses for all of the individual routers for the different resources.

module.exports = router
