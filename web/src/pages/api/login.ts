import { NextApiRequest, NextApiResponse,  } from 'next';
import { api } from '../../libs/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    const signInResponse = await api.post('/auth/signin', {
        email,
        password,
      }
    )

    api.defaults.headers.authorization = `Bearer ${signInResponse.data.token}`;

    const meResponse = await api.get(`${process.env.API_BASEURL}/auth/me`);

    return res.status(signInResponse.status).json(meResponse.data);
  } catch(err: any) {
    return res.status(500).json({message: err.message});
  }
}