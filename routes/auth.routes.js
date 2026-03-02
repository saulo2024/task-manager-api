import { Router } from 'express';
import { signUp, signIn } from '../controller/auth.controller.js';
import { arcjetMiddleware } from '../middlewares/arcjet.middleware.js';



const authRouter = Router();

authRouter.post('/sign-up', signUp); // Aqui nasce o /api/v1/auth/sign-up
authRouter.post('/sign-in', signIn); // Aqui nasce o /api/v1/auth/sign-in
authRouter.post('/sign-up', arcjetMiddleware, signUp); // Protege o sign-up com Arcjet
authRouter.post('/sign-in', arcjetMiddleware, signIn); // Protege o sign-in com Arcjet


export default authRouter;