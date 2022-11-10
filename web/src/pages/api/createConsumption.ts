import { NextApiRequest, NextApiResponse,  } from 'next';
import { api } from '../../libs/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      tag,
      date,
      value,
      discount,
      consumption,
    } = req.body;

    const response = await api.post('/consumptions/', {
        tag,
        date,
        value,
        discount,
        consumption,
      },
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        }
      }
    )

    return res.status(response.status).json(response.data);
  } catch(err: any) {
    return res.status(500).json({message: err.message});
  }
}