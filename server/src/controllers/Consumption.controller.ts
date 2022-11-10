import { Request, Response } from 'express';
import { z } from 'zod';
import { format, lastDayOfMonth, getMonth, subMonths, differenceInHours } from 'date-fns';
import { Consumption } from '../models/Consumption.model';
import { Op } from 'sequelize';

export async function listAllConsumptions(req: Request, res: Response) {
  try{
    const page = req.query.page

    const consumptions = await Consumption.findAndCountAll({
      where: {
        userId: req.userId,
      },
      limit: 10,
      offset: (Number(page) - 1) * 10,
    });

    const pagesCount = Math.ceil(consumptions.count / 10)

    const pages = [...Array(pagesCount).keys()].map((page) => page + 1)

    return res.status(200).json({pages, ...consumptions});
  } catch(error) {
    return res.status(400).json({error});
  }
}

export async function createConsumption(req: Request, res: Response) {
  try{
    const createConsumptionBody = z.object({
      tag: z.string().min(2),
      date: z.string(),
      value: z.number().min(0).or(z.string()),
      discount: z.number().optional().or(z.string()),
      consumption: z.number().min(0).or(z.string())
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

    return res.status(201).json();
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

    const consumptions = await Consumption.findAll({
      where: {
        userId: req.userId,
        date: {[Op.between]: [new Date(startOfThisMonth), new Date(endOfThisMonth)]},
      },
    });

    const monthDetails = {
      month: thisMonth,
      totalConsumption: consumptions.reduce((acc, consumption) => acc + consumption.consumption, 0),
      totalValue: consumptions.reduce((acc, consumption) => acc + consumption.value, 0),
      totalDiscount: consumptions.reduce((acc, consumption) => acc + consumption.discount, 0),
    }

    return res.status(200).json({monthDetails});
  } catch(error) {
    return res.status(400).json({error});
  }
}

export async function valueAndEconomy(req: Request, res: Response) {
  try{
    const today = new Date();
    const endOfThisMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd');
    const sixMonthsAgo = subMonths(today, 6);
    const startOfSixMonthsAgo = format(sixMonthsAgo, 'yyyy-MM-01');

    const consumptions = await Consumption.findAll({
      where: {
        userId: req.userId,
        date: {[Op.between]: [new Date(startOfSixMonthsAgo), new Date(endOfThisMonth)]},
      },
    });

    const valueAndEconomy= consumptions.map(consumption => {
      const month = getMonth(consumption.date) + 1;
      const totalValue = consumption.value;
      const totalDiscount = consumption.discount;

      return {
        month,
        totalValue,
        totalDiscount,
      }
    })

    const months = [...new Set(valueAndEconomy.map(consumption => consumption.month))];
    const values = months.map(
      month => valueAndEconomy.filter(
        consumption => consumption.month === month
      ).reduce((acc, consumption) => acc + consumption.totalValue, 0)
    );
    const discounts = months.map(
      month => valueAndEconomy.filter(
        consumption => consumption.month === month
      ).reduce((acc, consumption) => acc + consumption.totalDiscount, 0)
    );

    return res.status(200).json({months, values, discounts});
  } catch(error) {
    return res.status(400).json({error});
  }
}

export async function moreEnergyData(req: Request, res: Response) {
  try{
    const consumptions = await Consumption.findAll({
      where: {
        userId: req.userId,
      },
      attributes: ['date', 'consumption', 'value', 'discount'],
      order: [
        ['date', 'DESC']
      ]
    });

    const lastDate = consumptions[0].date;
    const firstDate = consumptions[consumptions.length - 1].date;

    let hours = differenceInHours(lastDate, firstDate);

    if(hours <= 0) {
      hours = 720;
    }

    const energyPerHour = consumptions.reduce((acc, consumption) => acc + consumption.consumption, 0) / hours || 720;
    const valuePerHour = consumptions.reduce((acc, consumption) => acc + consumption.value, 0) / hours;

    const valueTotal = consumptions.reduce((acc, consumption) => acc + consumption.value, 0);
    const economyTotal = consumptions.reduce((acc, consumption) => acc + consumption.discount, 0);

    return res.status(200).json({energyPerHour, valuePerHour, valueTotal, economyTotal});
  } catch(error) {
    return res.status(400).json({error});
  }
}