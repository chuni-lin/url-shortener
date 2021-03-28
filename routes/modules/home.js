const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const random = require('../../random')

// Set route to home
router.get('/', (req, res) => {
  res.render('index')
})

// Generate shortened URL
router.post('/', async (req, res) => {
  try {
    const originalUrl = req.body.originalUrl
    // To alert if user submits an no-content form
    if (!originalUrl.includes('https://') && !originalUrl.includes('http://')) {
      const alert = 'Please input an appropriate URL'
      res.render('index', { alert, originalUrl })
    }
    // To check if there's repeated random url
    const existsOriginalUrl = await URL.exists({ originalUrl })
    if (existsOriginalUrl) {
      const allUrl = await URL.find().lean()
      const findShortenUrl = allUrl.find(url => url.originalUrl.includes(originalUrl))
      const alert = 'This is a repeated URL!'
      res.render('index', { alert, findShortenUrl: findShortenUrl.shortenedUrl })
      return
    }
    const urlFront = `${(req.secure) ? 'https://' : 'http://'}` + `${req.headers.host}/`
    let shortenedUrl = urlFront + random()

    // shortenUrl  exists
    let existsShortenUrl = await URL.exists({ shortenedUrl })
    while (existsShortenUrl) {
      shortenedUrl = urlFront + random()
      existsShortenUrl = await URL.exists({ shortenedUrl })
    }

    URL.create({ originalUrl, shortenedUrl })
      .then(() => {
        res.render('result', { shortenedUrl, originalUrl })
      })
  } catch (error) {
    console.error(error)
  }
})

// Go to original website
router.get('/:currentURL', async (req, res) => {
  try {
    const { currentURL } = req.params
    const allUrl = await URL.find().lean()
    const findOriginalUrl = allUrl.find(url => url.shortenedUrl.includes(currentURL))
    res.redirect(findOriginalUrl.originalUrl)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
