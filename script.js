document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4f04a5c312a48472678fe0c9cca5b26e';
    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    const cityInput = document.getElementById('city-input');
    const searchForm = document.getElementById('search-form');
    const weatherInfo = document.getElementById('weather-info');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();

        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        try {
            const currentWeatherResponse = await fetch(`${currentWeatherUrl}?q=${city}&appid=${apiKey}`);
            const forecastResponse = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}`);

            const currentWeatherData = await currentWeatherResponse.json();
            const forecastData = await forecastResponse.json();

            if (currentWeatherResponse.ok && forecastResponse.ok) {
                displayCurrentWeather(currentWeatherData);
                display5DayForecast(forecastData);
            } else {
                weatherInfo.innerHTML = `City not found. Please try again.`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        }
    });

    function displayCurrentWeather(data) {
        const temperature = (data.main.temp - 273.15).toFixed(2);
        const weatherDescription = data.weather[0].description;

        const weatherHtml = `
            <h2>Current Weather in ${data.name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${weatherDescription}</p>
        `;

        weatherInfo.innerHTML = weatherHtml;
    }

    function display5DayForecast(data) {
        const forecastHtml = `
            <h2>5-Day Forecast</h2>
            <div class="forecast-container">
                ${data.list.slice(0, 5).map(day => `
                    <div class="forecast-day">
                        <p>Date: ${day.dt_txt}</p>
                        <p>Temperature: ${(day.main.temp - 273.15).toFixed(2)}°C</p>
                        <p>Description: ${day.weather[0].description}</p>
                    </div>
                `).join('')}
            </div>
        `;

        weatherInfo.innerHTML += forecastHtml;
    }
});