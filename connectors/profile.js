const Profile = require('../database/models/Profile')
const User = require('../database/models/User')
const { handleGeneralError } = require('../utils/generalError')
const { validationResult } = require('express-validator')

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('User', ['name', 'avatar'])
    if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' })
    res.status(200).json({
      success: true,
      data: profile
    })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

const createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twiiter, instagram, linkedin } = req.body

  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername
  if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())
  // build social object
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (facebook) profileFields.social.facebook = facebook
  if (twiiter) profileFields.social.twiiter = twiiter
  if (instagram) profileFields.social.instagram = instagram
  if (linkedin) profileFields.social.linkedin = linkedin

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      // update profile
      profile = await Profile.findByIdAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
      return res.status(204).json({
        success: true,
        msg: 'Update is success',
        data: profile
      })
    }
    // create
    profile = await Profile.create(profileFields)
    return res.status(200).json({
      success: true,
      data: profile
    })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

module.exports = {
  getProfile,
  createProfile
}