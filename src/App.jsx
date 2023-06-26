import { useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'b6a75494f9a85d418a7a87658086af69';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Weather Data:', data);
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

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <WiDaySunny size={48} />;
      case 'Clouds':
        return <WiCloudy size={48} />;
      case 'Rain':
        return <WiRain size={48}/>;
      case 'Snow':
        return <WiSnow size={48}/>;
      case 'Thunderstorm':
        return <WiThunderstorm size={48}/>;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return <WiFog />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Weather App</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter a city"
              value={city}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Get Weather</button>
        </form>
        {weatherData && (
          <div className="weather-info">
            <h3>{weatherData.name}</h3>
            <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].main)}</div>
            <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default App;
