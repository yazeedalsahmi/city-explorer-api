class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.low_temp},high of ${item.high_temp} with ${item.weather.description}`;
  }
}
module.exports =Forecast;
