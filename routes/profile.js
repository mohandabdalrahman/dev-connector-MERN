const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const { getProfile, createProfile, getAllProfiles, getProfileByUserId, deleteProfileAndUser, addProfileExperience, deleteExperience, addProfileEducation, deleteEducation, getUserRepo } = require('../connectors/profile')

router.route('/me').get(auth, getProfile)
router.route('/').post([auth, [
  body('status', 'status is required').not().isEmpty(),
  body('skills', 'skills is required').not().isEmpty(),
]], createProfile).delete(auth, deleteProfileAndUser)

router.route('/').get(getAllProfiles)
router.route('/user/:user_id').get(getProfileByUserId)

// add profile experience
router.route('/experience').put([auth,
  [
    body('title', 'title is required').not().isEmpty(),
    body('company', 'company is required').not().isEmpty(),
    body('from', 'from is required').not().isEmpty(),
  ]], addProfileExperience)

router.route('/experience/:exp_id').delete(auth, deleteExperience)

// add education
router.route('/education').put([auth, [
  body('school', 'school is required').not().isEmpty(),
  body('degree', 'degree is required').not().isEmpty(),
  body('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
  body('from', 'from is required').not().isEmpty(),
]], addProfileEducation)

router.route('/education/:edu_id').delete(auth, deleteEducation)


// get user repo from github
router.route('/github/:user_name').get(getUserRepo)

module.exports = router