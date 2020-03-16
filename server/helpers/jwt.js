const jwt = require('jsonwebtoken')

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
  },
  decodeToken(payload) {
    return jwt.verify(payload, process.env.JWT_SECRET)
  }
}