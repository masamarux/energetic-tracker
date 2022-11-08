import { Router } from 'express';
import { listAllConsumptions, createConsumption } from '../controllers/Consumption.controller';
import { authenticate } from '../middlewares/authenticate';

export const consumptionRoutes = Router();

consumptionRoutes.get('/', authenticate, listAllConsumptions)

consumptionRoutes.post('/', authenticate, createConsumption)
