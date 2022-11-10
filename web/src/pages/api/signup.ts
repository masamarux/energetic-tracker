import { NextApiRequest, NextApiResponse,  } from 'next';
import { api } from '../../libs/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, password } = req.body;
    const response = await api.post('/auth/signup', {
        name,
        email,
        password,
      }
    )
  
    return res.status(response.status).json(response.data);
  } catch(err: any) {
    res.status(500).json({message: err.message});
  }
}