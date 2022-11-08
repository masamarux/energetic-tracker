import { Request, Response } from 'express';
import { z } from 'zod';
import { Consumption } from '../models/Consumption.model';

export async function listAllConsumptions(req: Request, res: Response) {
  try{
    const consumptions = await Consumption.findAndCountAll({
      where: {
        userId: req.userId,
      }
    });

    return res.status(200).json({consumptions});
  } catch(error) {
    return res.status(400).json({error});
  }
}

export async function createConsumption(req: Request, res: Response) {
  try{
    const createConsumptionBody = z.object({
      tag: z.string(),
      date: z.string(),
      consumption: z.number(),
      value: z.number(),
      discount: z.number().optional(),
    })

    const {
      tag,
      consumption,
      date,
      value,
      discount
    } = createConsumptionBody.parse(req.body);

    

    const consumptionCreated = await Consumption.create({
      tag,
      consumption,
      date,
      discount,
      value,
      userId: req.userId,
    })

    return res.status(201).json({consumptionCreated});
  } catch(error) {
    return res.status(400).json({error});
  }
}