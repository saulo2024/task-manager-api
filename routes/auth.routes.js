import { Router } from 'express';
import { signUp } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp); // Aqui nasce o /api/v1/auth/sign-up

export default authRouter;