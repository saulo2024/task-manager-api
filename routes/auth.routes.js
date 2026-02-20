import { Router } from 'express';
import { signUp, signIn } from '../controller/auth.controller.js';



const authRouter = Router();

authRouter.post('/sign-up', signUp); // Aqui nasce o /api/v1/auth/sign-up
authRouter.post('/sign-in', signIn); // Aqui nasce o /api/v1/auth/sign-in

export default authRouter;