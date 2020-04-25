const path = require('path')
const express = require('express')
const hbs = require('hbs')
const R = require('ramda')
const { isNilOrEmpty } = require('./utils/helper')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Aryan Agarwal',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Aryan Agarwal',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Aryan Agarwal',
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Aryan Agarwal',
    errorMessage: 'Help not found',
  })
})

app.get('/weather', (req, res) => {
  const query = R.prop('query', req)
  const { address } = query

  if (isNilOrEmpty(address)) {
    return res.send({
      error: 'You must provide a address term',
    })
  }

  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error })
    }

    console.log('$$$$ latitude', latitude)
    console.log('$$$$ longitude', longitude)
    console.log('$$$$ location', location)

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Aryan Agarwal',
    errorMessage: 'Page not found',
  })
})

app.listen(3000, () => {
  console.log('App server running on 3000')
})
