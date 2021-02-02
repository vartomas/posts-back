const mongoose = require('mongoose')

const PrivatePostModel = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('privateposts', PrivatePostModel)
