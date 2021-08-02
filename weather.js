class Forecast {
  constructor(item) {
    this.description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
    this.date = item.valid_date;
  }
}


module.exports = Forecast;
