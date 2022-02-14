const axios = require('axios');
const config = require('../../config/config');
const ABSTRACT_API_KEY = process.env.API_KEY;

class Weather {
  async getWeather(coordinate) {
    const { latitude: lat, longitude: lon } = coordinate;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        config().weather.key
      }&units=metric`
    );
    const { name, main, weather } = data;

    const weatherData = `${name}\n${main.temp}\n${weather[0].description}`;

    return weatherData;
  }
}

module.exports = Weather;
