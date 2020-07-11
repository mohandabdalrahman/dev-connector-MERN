const express = require('express')
const router = express.Router()
const { body } = require('express-validator');

const auth = require('../middleware/auth')
const { getUser, loginUser } = require('../connectors/auth')

router.route('/').get(auth, getUser).post([
  body('email', 'email is required').isEmail(),
  body('password', 'please enter password').exists()
], loginUser)

module.exports = router