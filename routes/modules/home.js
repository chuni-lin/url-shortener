const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const random = require('../../random')

// Set route to home
router.get('/', (req, res) => {
  res.render('index')
})

// Generate shortened URL
router.post('/', (req, res) => {
  const url = req.body.url
  // To alert if user submits an no-content form
  if (!url.includes('https://') && !url.includes('http://')) {
    const alert = 'Please input an appropriate URL'
    res.render('index', { alert, url })
  }
  let randomURL = random()
  return URL.find()
    .lean()
    // To check if there's repeated random url
    .then(urls => {
      const arr = []
      urls.forEach(url => arr.push(url.shortenedUrl))
      while (arr.includes(randomURL)) {
        randomURL = random()
      }
    })
    .then(() => {
      return URL.create({ originalUrl: url, shortenedUrl: randomURL })
    })
    .then(() => {
      return res.render('result', { randomURL })
    })
    .catch(error => console.log(error))
})

// Go to original website
router.get('/:currentURL', (req, res) => {
  const { currentURL } = req.params
  URL.findOne({ shortenedUrl: currentURL })
    .lean()
    .then(url => res.redirect(url.originalUrl))
    .catch(error => console.log(error))
})

module.exports = router