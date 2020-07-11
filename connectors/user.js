const { validationResult } = require('express-validator');
const { handleGeneralError } = require('../utils/generalError')
const User = require('../database/models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    // check user exist
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email }).lean()
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exist'
      })
    }
    // get user gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt)
    // create user
    const user = await User.create({ name, email, password: encryptedPassword, avatar })
    // json web token
    // paylaod
    const payload = {
      user: {
        id: user._id
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
  registerUser
}