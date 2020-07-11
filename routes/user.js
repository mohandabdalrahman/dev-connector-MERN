const express = require('express')
const router = express.Router()
const { body } = require('express-validator');

const { registerUser } = require('../connectors/user')

router.route('/').post([
  body('name', 'name is required').not().isEmpty(),
  // email must be an email
  body('email', 'email is required').isEmail(),
  // password must be at least 5 chars long
  body('password', 'please enter password').isLength({ min: 5 })
], registerUser)

module.exports = router