
// start SERVICE_v01.03 code
import { promise as fs } from 'fs';

// start SERVICE_v03.01 code
import { promises as fs } from 'fs';


async function readTextFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}


async function writeTextFile(filePath: string, datat: string): Promise<void> {
  await fs.writeFile(filePath, data, 'utf-8');
}
// end SERVICE_v01.03 code

// start SERVICE_v01.01 code

async function writeTextFile(filePath: string, data: string): Promise<void> {
  await fs.writeFile(filePath, data, 'utf-8');
}

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;

    this.id = id;
  }
}
// end SERVICE_v01.01

// start SERVICE_v01.02 code
// TODO: Complete the HistoryService class
class HistoryService {
  async delete(id: string) {
    await this.removeCity(city.name);

    this. id = id;
  }
}
// end SERVICE_v03.01 code

// start SERVICE_v03.02 code
// TODO: Complete the HistoryService class
class HistoryService {
  async delete(id: string) {
    await this.removeCity(id);

  }
  async save(city: City) {
    await this.addCity(city.name);
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() { // <- starter code
    return JSON.parse(await readTextFile('./searchHistory.json'));
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) { // <- starter code

    await writeTextFile('./searchHistory.json', JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() { // <- starter code 

    await writetextFile('./searchHistory.json', JSON.strigify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() { // <- starter code

    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) { // <- starter code
    const cities = await this.read();
    const newCity = new City(city, `${cities.length + 1}`);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) { // <- starter code
    const cities = await this.read();
    const newCities = cities.filter((city: City) => city.id !== id);
    await this.write(newCities);
  }

  // end SERVICE_v01.02 code

}
// end SERVICE_v03.02 code
export default new HistoryService();
