// start SERVICE_v03.01 code
import { promises as fs } from 'fs';
async function readTextFile(filePath) {
    return await fs.readFile(filePath, 'utf-8');
}
// end SERVICE_v01.03 code
// start SERVICE_v01.01 code
async function writeTextFile(filePath, data) {
    await fs.writeFile(filePath, data, 'utf-8');
}
// TODO: Define a City class with name and id properties
class City {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
// end SERVICE_v01.01
// start SERVICE_v03.02 code
// TODO: Complete the HistoryService class
class HistoryService {
    async delete(id) {
        await this.removeCity(id);
    }
    async save(city) {
        await this.addCity(city.name);
    }
    // TODO: Define a read method that reads from the searchHistory.json file
    async read() {
        return JSON.parse(await readTextFile('./searchHistory.json'));
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        await writeTextFile('./searchHistory.json', JSON.stringify(cities));
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        const cities = await this.read();
        return cities;
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city) {
        const cities = await this.read();
        const newCity = new City(city, `${cities.length + 1}`);
        cities.push(newCity);
        await this.write(cities);
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) {
        const cities = await this.read();
        const newCities = cities.filter((city) => city.id !== id);
        await this.write(newCities);
    }
}
// end SERVICE_v03.02 code
export default new HistoryService();
