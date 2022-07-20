import { Express } from 'express';
import { router as userRouter } from '../user-routes';
import { API_BASE_URL} from '../../index';

export const registerRoutes = (app: Express) => {
    app.use(API_BASE_URL, userRouter);
};

