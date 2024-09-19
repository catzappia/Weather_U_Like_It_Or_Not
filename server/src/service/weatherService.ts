import dotenv from 'dotenv';
dotenv.config();

// SERVICE_v02.01 code start
// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  constructor(city: string, temperature: number, description: string, icon: string) {
    this.city = city;
    this.temperature = temperature;
    this.description = description;
    this.icon = icon;
  }
}
// end SERVICE_v02.01 code

// start SERVICE_v02.02 code
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private city: string;

  constructor(apiKey: string, city: string) {
    this.baseURL = 'https://api.openweathermap.org/data/2,5/';
    this.apiKey = apiKey;
    this.city = city;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) { // <- starter code
    const response = await fetch(query);
    return await response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates { // <- starter code
    const { lat, lon } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string { // <- starter code
    return `${this.baseURL}geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string { // <- starter code
    const { lat, lon } = coordinates;
    const apiKey = process.env.WEATHER_API_KEY;
    return `${this.baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() { // <- starter code
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) { // <- starter code
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) { // <- starter code
    const city = response.name;
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    const icon = response.weather[0].icon;
    return new Weather(city, temperature, description, icon);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(_currentWeather: Weather, weatherData: any[]) { // <- starter code
    const forecastArray = weatherData.map((weather: any) => {
      const date = new Date(weather.dt * 1000);
      const temperature = weather.main.temp;
      const description = weather.weather[0].description;
      const icon = weather.weather[0].icon;
      return { date, temperature, description, icon }
    });
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) { // <- starter code
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData.current);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    return { currentWeather, forecastArray };
  } 
}

const apiKey = process.env.WEATHER_API_KEY || '';
const city = 'YourCityName'; // Replace 'YourCityName' with the actual city name

export default new WeatherService(apiKey, city);

// end SERVICE_v02.02 code
