const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originalUrl: {
    type: String,
    require: true
  },
  shortenedUrl: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
