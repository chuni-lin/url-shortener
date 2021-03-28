const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener'
const db = mongoose.connection

// 連線資料庫
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.error('MongoDB error!'))
db.once('open', () => console.log('MongoDB connected!'))

module.exports = db
