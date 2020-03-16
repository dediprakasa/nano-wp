const { decodeToken } = require('../helpers/jwt')
const { User, Article } = require('../models')

module.exports = {
  authentication(req, res, next) {
    try {
      const access_token = req.headers.access_token.split(' ')[1]
      const payload = decodeToken(access_token)
      User.findById(payload.id)
        .then(user => {
          if (user) {
            req.decoded = payload
            next()
          } else {
            throw { status: 400, message: 'Invalid access token'}
          }
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  },
  
  authorization(req, res, next) {
    Article.findById(req.params.articleId)
      .then(article => {
        if (article) {
          if (article.author == req.decoded.id) {
            next()
          } else {
            next({ statusCode: 403, message: 'Forbidden access' })
          }
        } else {
          next({ statusCode: 404, message: 'Article not found' })
        }
      })
      .catch(next)
  }
}