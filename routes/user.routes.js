import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

// A rota '/me' só funciona se o 'authorize' validar o token
userRouter.get('/me', authorize, getUserProfile);

export default userRouter;