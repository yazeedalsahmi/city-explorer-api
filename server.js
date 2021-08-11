const express = require('express');
require('dotenv').config();
const server = express(); // initialize your express app instance
const axios = require('axios');
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;

class Movie {
  constructor(item) {
    this.title = item.title,
    this.overview = item.overview,
    this.average_votes = item.vote_count,
    this.image_ur = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
    this.popularity = item.popularity,
    this.released_on = item.release_date;
  }
}

server.get('/movies', (req, res) => {
  let searchQuery = req.query.city;
  console.log(searchQuery);
  const movie = `http://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  axios.get(movie).then(movieValue => {
    let movieInfo = movieValue.data.results.map((item) => {
      return new Movie(item);
    });
    console.log(movieInfo);
    res.send(movieInfo);
  })
    .catch(err => {
      res.send(err.message);
    });

});

class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.low_temp},high of ${item.high_temp} with ${item.weather.description}`;
  }
}

server.get('/weather', async (req, res) => {
  const { latitude, longitude } = req.query;
  /*const paramQuery = {
    params:  {
      key:process.env.WEATHER_API_KEY,
      lat:latitude,
      lon:longitude,
    }
  };*/
  //let searchQuery = req.query.searchQuery;
  const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`;
  axios.get(weatherURL).then(locWeatherValue => {
    console.log(locWeatherValue.data);
    let forcastArray = locWeatherValue.data.data.map((item) => {
      return new Forecast(item);
    });
    console.log(forcastArray);
    res.json(forcastArray);
    res.send(forcastArray);
  })
    .catch(err => {
      res.send(err.message);
    });
});


server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
