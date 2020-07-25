const Profile = require('../database/models/Profile')
const User = require('../database/models/User')
const Post = require('../database/models/Posts')
const { handleGeneralError } = require('../utils/generalError')
const { validationResult } = require('express-validator')
const axios = require('axios').default
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
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
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
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


const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    return res.status(200).json({
      success: true,
      data: profiles
    })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

// get profile by user id
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
    if (!profile) return res.status(400).json({ msg: 'Profile not found' })
    return res.status(200).json({
      success: true,
      data: profile
    })
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(400).json({ msg: 'Profile not found' })
    handleGeneralError(res, error, 500)
  }
}

const deleteProfileAndUser = async (req, res) => {
  try {
    // delete user posts
    await Post.deleteMany({ user: req.user.id })
    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id })
    // Remove user
    await User.findOneAndDelete({ _id: req.user.id })

    return res.json({ msg: 'Prifile and User deleted' })

  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

// add profile experience
const addProfileExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const newExp = {
    ...req.body
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile) return res.status(400).json({ msg: 'Profile not found' })
    profile.experience.unshift(newExp)
    await profile.save()
    return res.status(201).json({
      success: true,
      data: profile
    })

  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id },)
    const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    return res.json({ msg: 'Experience deleted', data: profile })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const addProfileEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const newEdu = {
    ...req.body
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile) return res.status(400).json({ msg: 'Profile not found' })
    profile.education.unshift(newEdu)
    await profile.save()
    return res.status(201).json({
      success: true,
      data: profile
    })

  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id },)
    const removeIndex = profile.education.map(item => item._id).indexOf(req.params.educ_id)
    profile.education.splice(removeIndex, 1)
    await profile.save()
    return res.json({ msg: 'Experience deleted', data: profile })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

//  get user repo by username
const getUserRepo = async (req, res) => {
  try {
    const repos = await axios.get(`https://api.github.com/users/${req.params.user_name}/repos?per_page=5&sort=created:asc&client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}`)
    if (!repos) return res.status(404).json({ msg: 'No Github profile found' })
    return res.status(200).json({
      success: true,
      count: repos.data.length,
      data: repos.data
    })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

module.exports = {
  getProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfileAndUser,
  addProfileExperience,
  deleteExperience,
  addProfileEducation,
  deleteEducation,
  getUserRepo
}