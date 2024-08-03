const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()
const port = 6771

const key = 'aca005b5dd8a084491617339d58af6ba'

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

app.get('/', (req, res) => {
  const address = req.query.address
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${key}`
  console.log(url)

  axios
    .get(url)
    .then(response => {
      const data = response.data
      const cityName = data.name
      const temperature = data.main.temp
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString()
      const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`

      res.send(`Weather Details ${message}`)
    })
    .catch(error => {
      console.log(error)
      res.status(`${error.status}`)
      res.send(`Error :${error.message}`)
    })
})
