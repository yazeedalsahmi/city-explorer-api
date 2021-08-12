const axios = require('axios');
require('dotenv').config;
const Weather = require('./Weather');

let weatherMomery = {};
let weatherHandler = (req, res) => {

  let searchQuery = req.query.searchQuery;
  if (weatherMomery[searchQuery] !== undefined) {
    res.send(weatherMomery[searchQuery]);


  } else {
    //let searchQuery = req.query.searchQuery;
    const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
    axios.get(weatherURL).then(locWeatherValue => {
      console.log(locWeatherValue.data.data);
      let forcastArray = locWeatherValue.data.data.map((item) => {
        return new Weather(item);
      });
      weatherMomery[searchQuery] = forcastArray;
      console.log(forcastArray);
      res.send(forcastArray);
    })
      .catch(err => {
        res.send(err.message);
      });
  }
};
module.exports = weatherHandler;

