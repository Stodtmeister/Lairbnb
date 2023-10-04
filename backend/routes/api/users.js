const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Last Name is required'),
  handleValidationErrors,
];

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });
    const safeUser = { id: user.id, firstName, lastName, email, username };

    await setTokenCookie(res, safeUser);
    return res.json({ user: safeUser });
  } catch (e) {
    console.log(e)
    if (e.errors[0].path === 'email') {
      const err = new Error('User already exists');
      err.errors = { email: 'User with that email already exists' };
      err.status = 500;
      return next(err);
    }
    if (e.errors[0].path === 'username') {
      const err = new Error('User already exists');
      err.errors = { username: 'User with that username already exists' };
      err.status = 500;
      return next(err);
    }

    next(e);
  }
});

module.exports = router;
