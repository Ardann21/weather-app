import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning, CloudFog, Wind, Thermometer } from 'lucide-react'; 


const weatherIconMap = {
  'Clear': Sun,
  'Clouds': Cloud,
  'Rain': CloudRain,
  'Drizzle': CloudRain, 
  'Snow': Snowflake,
  'Thunderstorm': CloudLightning,
  'Mist': CloudFog,
  'Smoke': CloudFog,
  'Haze': CloudFog,
  'Dust': CloudFog,
  'Fog': CloudFog,
  'Sand': CloudFog,
  'Ash': CloudFog,
  'Squall': CloudFog,
  'Tornado': CloudFog,
};


const weatherColorMap = {
  'Clear': "text-yellow-500",
  'Clouds': "text-gray-500",
  'Rain': "text-blue-500",
  'Drizzle': "text-blue-500",
  'Snow': "text-blue-300",
  'Thunderstorm': "text-yellow-600",
  'Mist': "text-gray-400",
  'Smoke': "text-gray-400",
  'Haze': "text-gray-400",
  'Dust': "text-gray-400",
  'Fog': "text-gray-400",
  'Sand': "text-gray-400",
  'Ash': "text-gray-400",
  'Squall': "text-gray-400",
  'Tornado': "text-gray-400",
};

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const apiKey = '47db5887b506ada0cbf94883344bf7da';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`; 


  const getWeatherIcon = (weatherMain) => {

    const IconComponent = weatherIconMap[weatherMain] || Thermometer;

    const iconColorClass = weatherColorMap[weatherMain] || "text-gray-600";

    return <IconComponent size={64} className={iconColorClass} />;
  };

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLocation('');
        setError(''); // Clear previous errors
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Location not found. Please enter a valid city name.');
        } else {
          setError('An error occurred. Please try again.');
        }
        setData({}); 
      }
    }
  };

  return (
 
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 text-white p-4 font-inter">

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-shadow-lg">
        Weather App
      </h1>

      <div className="relative w-full max-w-md mb-6">
        <input
          className="w-full p-4 rounded-xl bg-white bg-opacity-20 backdrop-filter text-black backdrop-blur-sm placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 shadow-lg text-lg"
          onKeyDown={searchLocation}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name..."
        />

        {error && <p className="absolute -bottom-7 left-0 text-red-200 text-sm mt-1">{error}</p>}
      </div>

   
      {data.name && (
        <div className="bg-white bg-opacity-25 rounded-2xl p-8 w-full max-w-lg shadow-xl text-center transition-all duration-500 transform hover:scale-105">
          {/* City Name */}
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">{data.name}</h2>

          {data.weather && (
            <div className="flex flex-col items-center mb-4">
              {getWeatherIcon(data.weather[0].main)}
              <p className="text-2xl font-medium text-gray-700 capitalize mt-2">{data.weather[0].description}</p>
            </div>
          )}

        
          {data.main && (
            <p className="text-6xl font-bold mb-4 text-gray-900">
              {data.main.temp.toFixed(1)}°C
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-800">
            {data.main && (
              <div className="bg-white bg-opacity-30 rounded-lg p-3 flex items-center justify-center shadow-inner">
                <Thermometer size={20} className="mr-2" />
                <span>Feels like: {data.main.feels_like.toFixed(1)}°C</span>
              </div>
            )}
            {data.main && (
              <div className="bg-white bg-opacity-30 rounded-lg p-3 flex items-center justify-center shadow-inner">
                <CloudRain size={20} className="mr-2" />
                <span>Humidity: {data.main.humidity}%</span>
              </div>
            )}
            {data.wind && (
              <div className="bg-white bg-opacity-30 rounded-lg p-3 flex items-center justify-center shadow-inner">
                <Wind size={20} className="mr-2" />
                <span>Wind: {data.wind.speed.toFixed(1)} m/s</span>
              </div>
            )}
            {data.main && (
              <div className="bg-white bg-opacity-30 rounded-lg p-3 flex items-center justify-center shadow-inner">
                <Sun size={20} className="mr-2" />
                <span>Pressure: {data.main.pressure} hPa</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
