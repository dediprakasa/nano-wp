const express = require('express')
const router = express.Router()
const { ArticleController } = require('../controllers')
const { authentication, authorization } = require('../middlewares/auth')
const multer = require('multer')
const gcsMiddleware = require('../middlewares/google-cloud-storage')

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

router.get('/', ArticleController.findAllArticles)
// router.get('/search', ArticleController.findAllArticles)
router.get('/:articleId', ArticleController.findOneArticle)

router.use(authentication)
router.post('/', upload.single('featured_image'), gcsMiddleware.sendUploadToGCS, ArticleController.addPost)
router.patch('/:articleId', authorization, upload.single('featured_image'), gcsMiddleware.sendUploadToGCS, ArticleController.updateArticle)
router.delete('/:articleId', authorization, ArticleController.deleteArticle)

module.exports = router