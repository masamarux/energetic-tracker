import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse,  } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    setCookie('token', '', {
      req,
      res
    })

    return res.status(200).json({ message: 'Logged out' });
  } catch(err: any) {
    return res.status(500).json({message: err.message});
  }
}