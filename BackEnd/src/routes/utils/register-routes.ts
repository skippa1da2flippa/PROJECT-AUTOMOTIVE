import { Express } from 'express';
import { router as userRouter } from '../user-routes';
import { router as authRouter } from '../auth-routes'
import { API_BASE_URL} from '../../index';
import { router as myVehicleRouter } from '../my-vehicle-routes'

export const registerRoutes = (app: Express) => {
    app.use(API_BASE_URL, userRouter);
    app.use(API_BASE_URL, authRouter)
    app.use(API_BASE_URL, myVehicleRouter)
};

