import { Request, Response } from 'express';
import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { jwt } from '../configs/jwt.config';

import { User } from '../models/User.model';

export async function signIn(req: Request, res: Response) {
  try{
    const signInBody = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  
    const {
      email,
      password,
    } = signInBody.parse(req.body);
  
    const user = await User.findOne({
      where: {
        email: email,
      }
    })

    if(!user) return res.status(404).json({message: 'Usuário não encontrado'});

    const isPasswordCorrect = await compare(password, user.password);

    if(!isPasswordCorrect) return res.status(401).json({message: 'Senha incorreta'});

    const token = sign({}, String(jwt.secret), {
      subject: String(user.id),
      expiresIn: jwt.expiresIn,
    });

    return res.status(200).json({token});
  } catch(error) {
    return res.status(400).json({error});
  }
}

export async function signUp(req: Request, res: Response) {
  try{
    const signInBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
  
    const {
      name,
      email,
      password,
    } = signInBody.parse(req.body);
  
    let user = await User.findOne({
      where: {
        email: email,
      }
    })

    if (user) return res.status(409).json({message: 'Usuário já cadastrado'});

    const passwordHashed = await hash(password, 10);

    user = await User.create({
      name,
      email,
      password: passwordHashed,
    })

    return res.status(201).json();
  } catch(error) {
    return res.status(400).json({error});
  }
}

export async function me(req: Request, res: Response) {
  try{
    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    });

    if(!user) return res.status(404).json({message: 'Usuário não encontrado'});

    return res.status(200).json({user});
  } catch(error) {
    return res.status(400).json({error});
  }
}
