const apiKey = '1931f678aa824d36844143836251208'; // Your WeatherAPI key

const submitButton = document.getElementById('submit-btn');
const locationInput = document.getElementById('location-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastWeatherDiv = document.getElementById('forecast-weather');

submitButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location.trim() === '') {
    alert('Please enter a location');
    return;
  }
  fetchWeather(location);
});

async function fetchWeather(location) {
  try {
    const currentWeatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    const currentWeatherResponse = await fetch(currentWeatherURL);
    const currentWeatherData = await currentWeatherResponse.json();

    const forecastWeatherURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;
    const forecastWeatherResponse = await fetch(forecastWeatherURL);
    const forecastWeatherData = await forecastWeatherResponse.json();

    displayCurrentWeather(currentWeatherData);
    displayForecastWeather(forecastWeatherData);
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred while fetching weather data');
  }
}

function displayCurrentWeather(data) {
  const location = data.location.name;
  const tempC = data.current.temp_c;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon; // Icon URL

  currentWeatherDiv.innerHTML = `
    <h3>Current Weather</h3>
    <p><strong>${location}</strong></p>
    <p>Temperature: ${tempC}°C</p>
    <p>Condition: ${condition}</p>
    <img src="https:${icon}" alt="${condition}">
  `;
}

function displayForecastWeather(data) {
  const forecast = data.forecast.forecastday;
  let forecastHTML = '<h3>Forecast Weather</h3>';

  forecast.forEach(day => {
    const date = day.date;
    const maxTempC = day.day.maxtemp_c;
    const minTempC = day.day.mintemp_c;
    const icon = day.day.condition.icon;
    const condition = day.day.condition.text;

    forecastHTML += `
      <p>
        <strong>${date}</strong> - Max: ${maxTempC}°C, Min: ${minTempC}°C 
        <img src="https:${icon}" alt="${condition}" style="vertical-align: middle;">
      </p>
    `;
  });

  forecastWeatherDiv.innerHTML = forecastHTML;
}
