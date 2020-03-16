const mongoose = require('mongoose')
const { Schema, model, models } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title must be filled out']
  },
  content: {
    type: String,
    required: [true, 'Content must be filled out']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  featured_image: {
    type: String,
    required: [true, 'Image must be filled out']
  },
  tags: [{
    type: String
  }]
}, { timestamps: true })


const Article = model('Article', articleSchema)

module.exports = Article