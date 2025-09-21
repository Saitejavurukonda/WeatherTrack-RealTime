// WeatherAPI key
const apiKey = '1931f678aa824d36844143836251208'; // your WeatherAPI key

const submitButton = document.getElementById('submit-btn');
const locationInput = document.getElementById('location-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastWeatherDiv = document.getElementById('forecast-weather');

submitButton.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (!location) {
    alert('Please enter a location');
    return;
  }
  fetchWeather(location);
});

async function fetchWeather(location) {
  try {
    const locationEncoded = encodeURIComponent(location);

    // Fetch current weather
    const currentURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationEncoded}`;
    const currentRes = await fetch(currentURL);
    const currentData = await currentRes.json();

    // Fetch 3-day forecast
    const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationEncoded}&days=3`;
    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    displayCurrentWeather(currentData);
    displayForecastWeather(forecastData);
  } catch (err) {
    console.error(err);
    alert('Location not found or API error');
  }
}

function displayCurrentWeather(data) {
  const location = `${data.location.name}, ${data.location.country}`;
  const tempC = data.current.temp_c;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;

  currentWeatherDiv.innerHTML = `
    <h3>Current Weather</h3>
    <p><strong>${location}</strong></p>
    <p>Temperature: ${tempC}°C</p>
    <p>Condition: ${condition}</p>
    <img src="https:${icon}" alt="${condition}">
  `;
}

function displayForecastWeather(data) {
  let forecastHTML = '<h3>3-Day Forecast</h3>';
  const forecast = data.forecast.forecastday;

  forecast.forEach(day => {
    const date = day.date;
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
    const condition = day.day.condition.text;
    const icon = day.day.condition.icon;

    forecastHTML += `
      <p>
        <strong>${date}</strong> - Max: ${maxTemp}°C, Min: ${minTemp}°C
        <img src="https:${icon}" alt="${condition}" style="vertical-align: middle;">
        ${condition}
      </p>
    `;
  });

  forecastWeatherDiv.innerHTML = forecastHTML;
}
