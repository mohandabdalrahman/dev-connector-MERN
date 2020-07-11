const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const { getProfile, createProfile } = require('../connectors/profile')
router.route('/me').get(auth, getProfile)
router.route('/').post([auth, [
  body('status', 'status is required').not().isEmpty(),
  body('skills', 'skills is required').not().isEmpty(),
]], createProfile)

module.exports = router