const { Article } = require('../models')
const { tagFormatter } = require('../helpers/tagFormatter')

class ArticleController {
  static addPost(req, res, next) {
    const author = req.decoded.id
    const { title, content } = req.body
    const featured_image = req.file.gcsUrl
    let tags = tagFormatter(req.body.tags)
    Article.create({
      title,
      content,
      featured_image,
      tags,
      author
    })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static findAllArticles(req, res, next) {
    let query = {}
    if (req.query.tag) {
      query = { tags: { $elemMatch: { $regex: req.query.tag, $options: 'i' }}}
    } else {
      let q = req.query.q || ''
      query = {
        $or: [
          { title: { $regex: q, $options: 'i' }},
          { tags: { $elemMatch: { $regex: q, $options: 'i' }}}
        ]
      }
    }
    Article.find(query)
      .sort({ createdAt: -1 })
      .populate('author', ['username', 'email'])
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findOneArticle(req, res, next) {
    Article.findById(req.params.articleId)
      .populate('author', ['username', 'email'])
      .then(article => {
        if (article) {
          res.status(200).json(article)
        } else {
          next({ statusCode: 404, message: 'Article not found' })
        }
      })
      .catch(next)
  }

  static updateArticle(req, res, next) {
    const { title, content, tags } = req.body
    const featured_image = req.file.gcsUrl
    const update = {}
    title && (update.title = title)
    content && (update.content = content)
    featured_image && (update.featured_image = featured_image)
    tags ? (update.tags = tagFormatter(tags)) : (update.tags = [])
    Article.findByIdAndUpdate(req.params.articleId,
      update,
      { new: true, omitUndefined: true })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static deleteMovie(req, res, next) {
    Movie.findByIdAndDelete(req.params.movieId)
      .then(movie => {
        if (movie) {
          res.status(200).json({
            message: 'Successfully deleted'
          })
        } else {
          next({ statusCode: 404, message: 'Movie not found' })
        }
      })
      .catch(next)
  }
}

module.exports = ArticleController