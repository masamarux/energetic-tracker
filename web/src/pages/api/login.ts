import { NextApiRequest, NextApiResponse,  } from 'next';
import {setCookie} from 'cookies-next'
import { api } from '../../libs/backend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    const signInResponse = await api.post('/auth/signin', {
        email,
        password,
      }
    )

    const meResponse = await api.get(`${process.env.API_BASEURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${signInResponse.data.token}`,
      }
    });

    setCookie('token', signInResponse.data.token, {
      req,
      res,
      maxAge: 60 * 60 * 24, // 1 day
    })

    return res.status(signInResponse.status).json({
      ...meResponse.data,
    });
  } catch(err: any) {
    return res.status(500).json({message: err.message});
  }
}