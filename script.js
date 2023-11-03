// Replace with your OpenWeatherMap API key
const apiKey = '4f04a5c312a48472678fe0c9cca5b26e';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

// Elements
const cityInput = document.getElementById('city-input');
const searchForm = document.getElementById('search-form');
const weatherInfo = document.getElementById('weather-info');
const searchHistory = document.getElementById('search-history');

// Event listener for search form
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city.trim() === '') return;

    // Get the 5-day forecast for the searched city
    const forecastData = await get5DayForecast(city);
    if (forecastData) {
        displayCity5DayForecast(city, forecastData);
        cityInput.value = '';
        addCityToHistory(city);
    }
});

// Function to fetch 5-day forecast data for a specific city
async function get5DayForecast(city) {
    try {
        const response = await fetch(`${apiUrl}/forecast?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

// Function to display the 5-day forecast for a specific city
function displayCity5DayForecast(city, forecastData) {
    if (forecastData === null) {
        weatherInfo.innerHTML = 'City not found.';
        return;
    }

    const forecastHtml = `
    <h2>5-Day Forecast for ${city}</h2>
    <div class="row">
        ${forecastData.list.slice(0, 5).map(day => `
            <div class="col-lg-2">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${day.weather[0].description}</h5>
                        <p class="card-text">Max Temp: ${(day.main.temp_max - 273.15).toFixed(2)}°C</p>
                        <p class="card-text">Min Temp: ${(day.main.temp_min - 273.15).toFixed(2)}°C</p>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
  `;

    weatherInfo.innerHTML = forecastHtml;
}

// Function to add searched city to history
function addCityToHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.classList.add('list-group-item');
    searchHistory.appendChild(listItem);
}
