import { Request, Response } from 'express';
import { z } from 'zod';
import { format, lastDayOfMonth, getMonth } from 'date-fns';
import { Consumption } from '../models/Consumption.model';
import { Op } from 'sequelize';

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

export async function monthDetails(req: Request, res: Response) {
  try{
    const today = new Date();
    const startOfThisMonth = format(today, 'yyyy-MM-01');
    const endOfThisMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd');
    const thisMonth = getMonth(today) + 1;

    const consumptions = await Consumption.findAndCountAll({
      where: {
        userId: req.userId,
        date: {[Op.between]: [new Date(startOfThisMonth), new Date(endOfThisMonth)]},
      },
    });

    const monthDetails = {
      month: thisMonth,
      totalConsumption: consumptions.rows.reduce((acc, consumption) => acc + consumption.consumption, 0),
      totalValue: consumptions.rows.reduce((acc, consumption) => acc + consumption.value, 0),
      totalDiscount: consumptions.rows.reduce((acc, consumption) => acc + consumption.discount, 0),
    }

    return res.status(200).json({monthDetails});
  } catch(error) {
    return res.status(400).json({error});
  }
}