import { Express } from 'express';
import { router as userRouter } from '../user-routes';
import { router as authRouter } from '../auth-routes'
import { API_BASE_URL} from '../../index';

export const registerRoutes = (app: Express) => {
    app.use(API_BASE_URL, userRouter);
    app.use(API_BASE_URL, authRouter)
};

