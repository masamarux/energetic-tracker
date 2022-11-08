import { Router } from 'express';
import { me, signIn, signUp } from '../controllers/Auth.controller';
import { authenticate } from '../middlewares/authenticate';

export const authRoutes = Router();

authRoutes.post('/signin', signIn)

authRoutes.post('/signup', signUp)

authRoutes.get('/me', authenticate, me)
