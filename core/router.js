import express from 'express';
import Database from './Database';
import VehicleController from './controllers/VehicleController';
import Validator from './Validator'
import RouteController from './controllers/RouteController';
import AnalyticsController from './controllers/AnalyticsController';
import { Analytics } from './models';

const router = express.Router();

const container = {
    db: new Database(),
    validator: new Validator()
};

const vehicleController = new VehicleController(container);
const routeController = new RouteController(container);
const analyticsController = new AnalyticsController(container);

//vehicle routes
router.post('/vehicles', async (req, res) => {
    return await vehicleController.create(req, res);
});
router.get('/vehicles/:id/', async (req, res) => {
    return await vehicleController.show(req, res);
})
router.get('/vehicles', async (req, res) => {
    return await vehicleController.index(res);
})
router.get('/availableVehicles', async (req, res) => {
    return await vehicleController.getAllAvailbleVehicles(res);
})
router.put('/vehicles/:id/', async (req, res) => {
    return await vehicleController.update(req, res);
})
router.delete('/vehicles/:id/', async (req, res) => {
    return await vehicleController.delete(req, res);
})

//route routes
router.post('/routes', async (req, res) => {
    return await routeController.create(req, res);
})
router.get('/routes', async (req, res) => {
    return await routeController.index(req, res);
})
router.put('/routes/:id/', async (req, res) => {
    return await routeController.update(req, res);
})
router.delete('/routes/:id/', async (req, res) => {
    return await routeController.delete(req, res);
})

//analytics routes
router.get('/analytics', async (req, res) => {
    return await analyticsController.index(req, res);
});


export default router;