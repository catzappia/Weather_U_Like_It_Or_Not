import dotenv from 'dotenv';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(city, temperature, description, icon) {
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
    constructor(apiKey, city) {
        this.baseURL = 'https://api.openweathermap.org/data/2,5/';
        this.apiKey = apiKey;
        this.city = city;
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(query);
        return await response.json();
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        const { lat, lon } = locationData;
        return { lat, lon };
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery() {
        return `${this.baseURL}geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        const { lat, lon } = coordinates;
        const apiKey = process.env.WEATHER_API_KEY;
        return `${this.baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const query = this.buildWeatherQuery(coordinates);
        const response = await fetch(query);
        return await response.json();
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const city = response.name;
        const temperature = response.main.temp;
        const description = response.weather[0].description;
        const icon = response.weather[0].icon;
        return new Weather(city, temperature, description, icon);
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(_currentWeather, weatherData) {
        const forecastArray = weatherData.map((weather) => {
            const date = new Date(weather.dt * 1000);
            const temperature = weather.main.temp;
            const description = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            return { date, temperature, description, icon };
        });
        return forecastArray;
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
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
