const URL = require('../url')
const db = require('../../config/mongoose')

db.once('open', () => {
  URL.create(
    {
      originalUrl: 'https://www.lemonde.fr',
      shortenedUrl: 'afcdd'
    },
    {
      originalUrl: 'https://news.tbs.co.jp',
      shortenedUrl: 'avfds'
    })
  console.log('Done!')
})