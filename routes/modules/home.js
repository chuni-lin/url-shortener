const express = require('express')
const router = express.Router()

// Set route to home
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router