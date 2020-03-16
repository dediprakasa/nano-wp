const bcrypt = require('bcryptjs')

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 10)
  },
  verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}