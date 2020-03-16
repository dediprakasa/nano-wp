const mongoose = require('mongoose')
let DB_URI = process.env.DB_URI

if (process.env.NODE_ENV === 'development') {
  DB_URI += '-development'
}

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!')
})

module.exports = mongoose