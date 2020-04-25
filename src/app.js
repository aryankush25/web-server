const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index from hbs app',
    name: 'Aryan Agarwal',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Aryan Agarwal',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Aryan Agarwal',
  })
})

app.get('/weather', (req, res) => {
  res.send('Your Weather')
})

app.listen(3000, () => {
  console.log('App server started')
})
