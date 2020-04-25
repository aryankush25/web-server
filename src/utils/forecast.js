const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&latitude=${latitude}&longitude=${longitude}&oneobservation=true&apiKey=UwKnO1Lsb1NwkSZUONKdtGb17mPcK53aYoQ2sZjus0Y`

  request({ url, json: true }, (error, { body }) => {
    console.log('$$$$ error', error)
    console.log('$$$$ body', body)

    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        body.observations.location[0].observation[0].description +
          ' It is currently ' +
          body.observations.location[0].observation[0].temperature +
          ' degress out.'
      )
    }
  })
}

module.exports = forecast
