const express = require('express');
require('dotenv').config();
const server = express(); // initialize your express app instance

const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;

class Forecast {
  constructor(date,description){
    this.date =date;
    this.description = description;
  }
}

server.get('/weather',(req,res)=>{

  let searchQuery = req.query.searchQuery;
  let lon = req.query.latitude;
  let lat = req.query.longitudinal;
  const weather =  weatherData.find((item) => {
    if (item.city_name === searchQuery && item.lon === lon && item.lat === lat) {
      return(item);
    }

  });
  try {
    const weatherDataArr = weather.data.map(item => {
      let date = item.valid_date;
      let description = `Low of ${item.low_temp} , high of ${item.high_temp} with ${item.weather.description} `;
      return new Forecast(date,description);
    });
    res.send(weatherDataArr);
  }
  catch(error) {
    res.send('Error! Please enter a valid city');
    console.log(weatherData);
  }

});



server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
