const User = require('../database/models/User')
const { handleGeneralError } = require('../utils/generalError')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    // check user exist
    const { email, password } = req.body
    const userExist = await User.findOne({ email }).lean()
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: 'Invalid creditentals'
      })
    }

    // check password
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid creditentals'
      })
    }
    // json web token
    // paylaod
    const payload = {
      user: {
        id: userExist._id
      }
    }
    jwt.sign(payload, process.env.jwtSecretKey, { expiresIn: '6h' }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    handleGeneralError(res, error, 500)
  }
}


module.exports = {
  getUser,
  loginUser
}