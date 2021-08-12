const axios = require('axios');
require('dotenv').config;
const Weather = require('./Weather');

let weatherHandler = (req, res) => {

  const { latitude, longitude } = req.query;

  //let searchQuery = req.query.searchQuery;
  const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`;
  axios.get(weatherURL).then(locWeatherValue => {
    console.log(locWeatherValue.data.data);
    let forcastArray = locWeatherValue.data.data.map((item) => {
      return new Weather(item);
    });
    console.log(forcastArray);
    res.json(forcastArray);
    res.send(forcastArray);
  })
    .catch(err => {
      res.send(err.message);
    });
};
module.exports=weatherHandler;

