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
    WeatherService.getWeatherForCity(city)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({ message: err.message }));
    // TODO: save city to search history
    HistoryService.save(city);
});
// end v01.01
// start code for v01.02
// TODO: GET search history
router.get('/history', async (_req, res) => {
    const cities = HistoryService.getCities();
    res.json(cities);
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
    }
    HistoryService.delete(id);
});
// end v01.02
export default router;
