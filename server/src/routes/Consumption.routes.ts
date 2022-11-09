import { Router } from 'express';
import { listAllConsumptions, createConsumption, monthDetails, valueAndEconomy, moreEnergyData } from '../controllers/Consumption.controller';
import { authenticate } from '../middlewares/authenticate';

export const consumptionRoutes = Router();

consumptionRoutes.get('/', authenticate, listAllConsumptions)

consumptionRoutes.post('/', authenticate, createConsumption)

consumptionRoutes.get('/month-details', authenticate, monthDetails)

consumptionRoutes.get('/value-and-economy-chart', authenticate, valueAndEconomy)

consumptionRoutes.get('/more-energy-data', authenticate, moreEnergyData)
