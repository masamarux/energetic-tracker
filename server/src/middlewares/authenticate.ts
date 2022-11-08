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

    const decoded = verify(token, String(jwt.secret));

    const user = await User.findByPk(String(decoded.sub));

    if (!user) return res.status(401).json({error: 'Token invalid'});

    req.userId= String(decoded.sub);

    next()
  } catch(error) {
    return res.status(400).json({error});
  }
}