import { Router } from 'express';
import { listAllConsumptions, createConsumption, monthDetails } from '../controllers/Consumption.controller';
import { authenticate } from '../middlewares/authenticate';

export const consumptionRoutes = Router();

consumptionRoutes.get('/', authenticate, listAllConsumptions)

consumptionRoutes.post('/', authenticate, createConsumption)

consumptionRoutes.get('/month-details', authenticate, monthDetails)
