import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify, VerifyCallback } from 'jsonwebtoken';
import { z } from 'zod';

import { jwt } from '../configs/jwt.config';
import { User } from '../models/User.model';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const signInHeader = z.object({
      authorization: z.string(),
    })
  
    const {
      authorization
    } = signInHeader.parse(req.headers);

    const [, token] = authorization.split(' ');

    verify(token, String(jwt.secret), async function(err, decoded) {
      if (err) {
        return res.status(401).json({error: 'Invalid token'})
      }

      if(decoded) {
        const user = await User.findByPk(String(decoded.sub));

        if (!user) return res.status(404).json({error: 'User not found'});
  
        req.userId= String(decoded.sub);

        return next()
      }

      return res.status(500).json({error: 'Unknown error'})
    });
  } catch(error) {
    return res.status(400).json({error});
  }
}