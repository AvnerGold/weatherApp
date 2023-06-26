import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = ' b6a75494f9a85d418a7a87658086af69';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError('');
      } else {
        setWeatherData(null);
        setError('Failed to fetch weather data.');
      }
    } catch (error) {
      setWeatherData(null);
      setError('Error occurred while fetching weather data.');
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
       <div className="weather-card">
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
    </>
  )
}

export default App
