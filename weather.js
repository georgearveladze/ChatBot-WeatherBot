const axios = require('axios');
require('dotenv').config();
const ABSTRACT_API_KEY = process.env.API_KEY;
const getWeather = async (coordinate) => {
  const { latitude: lat, longitude: lon } = coordinate;
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ABSTRACT_API_KEY}&units=metric`
  );
  const { name, main, weather } = data;
  const weatherData = `${name}\n${main.temp}\n${weather[0].description}`;
  return weatherData;
};

module.exports = getWeather;
