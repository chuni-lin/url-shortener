const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const randomNumber = require('./randomNumber.js')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})