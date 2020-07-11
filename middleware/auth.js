const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({ msg: 'Token not found, Authorization denied' })
  try {
    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    req.user = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'token is invalid' })
  }
}