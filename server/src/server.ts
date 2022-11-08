import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import './db';
import { syncAllModels } from './utils/syncAllModels';
import { authRoutes } from './routes/Auth.routes';
import { consumptionRoutes } from './routes/Consumption.routes';

const app = express();

app.use(cors());
app.use(express.json());

syncAllModels()

app.use('/auth', authRoutes);
app.use('/consumptions', consumptionRoutes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});