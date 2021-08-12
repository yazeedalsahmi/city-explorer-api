const Movie = require('./Movie');
require('dotenv').config();
const axios = require('axios');
let movieMomery ={};

let movieHandler = (req, res) => {
  let searchQuery = req.query.city;
  console.log(searchQuery);
  if (movieMomery[searchQuery] !== undefined) {
    res.send(movieMomery[searchQuery]);
  } else {
    const movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    axios.get(movie).then(movieValue => {
      console.log(movieValue.data.results[0].title);

      let movieInfo = movieValue.data.results.map((item) => {
        return new Movie(item);
      });
      movieMomery[searchQuery] = movieInfo;
      res.send(movieInfo);
    })
      .catch(err => {
        res.send(err.message);
      });

  }
};
module.exports = movieHandler;
