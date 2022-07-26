import { Express } from 'express';
import { router as userRouter } from '../user-routes';
import { router as authRouter } from '../auth-routes'
import { API_BASE_URL} from '../../index';
import { router as myVehicleRouter } from '../my-vehicle-routes'
import { router as routineRouter } from "../routine-route"
import { router as settingRouter } from "../setting-routes"
import { router as notRouter } from "../notification-routes"
import { router as statRouter } from "../stats-routes"

export const registerRoutes = (app: Express) => {
    app.use(API_BASE_URL, userRouter);
    app.use(API_BASE_URL, authRouter)
    app.use(API_BASE_URL, myVehicleRouter)
    app.use(API_BASE_URL, routineRouter)
    app.use(API_BASE_URL, settingRouter)
    app.use(API_BASE_URL, notRouter)
    app.use(API_BASE_URL, statRouter)
};

