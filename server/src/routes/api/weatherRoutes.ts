import { Router } from 'express';
const router = Router();
// (v01.01 -- commented in the imports below.)
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// start code for v01.01
// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const city = req.body.city;

  WeatherService.getWeather()
    .then((data: any) => res.json(data))
    .catch((err: { message: any; }) => res.status(500).json({ message: err.message}));
  
  // TODO: save city to search history
  HisoryService.save(city);
});
// end v01.01

// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
