import { Types } from 'mongoose';
import {Router, Response, Request} from 'express';
import * as usr from '../model/database/user';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import {retrieveUserId, retrieveVehicleId, skipLimitChecker} from './utils/param-checking';
import { authenticateToken } from './auth-routes';
import {
    ProjectVehicleDocument,
    getVehiclesByUserId,
    getVehicleById, ModelTypes, deleteVehicle, createVehicle, projectVehicle
} from '../model/database/my-vehicle'
import {ServerError} from "../model/errors/server-error";
import {UserEndpointResponse} from "./user-routes";
import {LegalInfos} from "../model/database/legalInfos";
import {ioServer} from "../index";


interface  VehicleEndpointLocals {
    vehicleId: Types.ObjectId
    type: ModelTypes
}

interface VehicleEndpointResponse extends Response {
    locals: VehicleEndpointLocals
}

interface VehicleCreationBody {
    type: ModelTypes
    owner: string
    legalInfos: LegalInfos
    password: string
}

interface VehicleCreationRequest extends Request {
    body: VehicleCreationBody
}

interface UpdateEnjoyerBody {
    vehicleId: string
    enjoyerId: string
    enjoyerName: string
    enjoyerSurname: string
}

interface UpdateEnjoyerRequest extends AuthenticatedRequest{
    body: UpdateEnjoyerBody
}

interface BaseVehicleRequestBody {
    vehicleId: string
}

interface BaseVehicleRequest extends AuthenticatedRequest {
    body: BaseVehicleRequestBody
}

interface OwnerUpdateRequestBody {
    newOwner: string
    vehicleId: string
}

interface OwnerUpdateRequest extends BaseVehicleRequest {
    body: OwnerUpdateRequestBody
}



export const router = Router();


router.get(
    '/myVehicle/@it',
    authenticateToken,
    retrieveVehicleId,
    async (req: AuthenticatedRequest, res: VehicleEndpointResponse) => {
        let vehicle: ProjectVehicleDocument;
        const vehicleId: Types.ObjectId = res.locals.vehicleId;
        try {
            vehicle = await getVehicleById(vehicleId);
            return res.status(201).json({
                vehicleId: vehicle._id,
                type: vehicle.type,
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

router.get(
    '/myVehicle/@it/owner',
    authenticateToken,
    retrieveVehicleId,
    async (req: AuthenticatedRequest, res: VehicleEndpointResponse) => {
        let vehicle: ProjectVehicleDocument;
        const vehicleId: Types.ObjectId = res.locals.vehicleId;
        try {
            vehicle = await getVehicleById(vehicleId);
            return res.status(201).json({
                owner: vehicle.owner
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

router.get(
    '/myVehicle/@it/enjoyers',
    authenticateToken,
    retrieveVehicleId,
    async (req: AuthenticatedRequest, res: VehicleEndpointResponse) => {
        let vehicle: ProjectVehicleDocument;
        const vehicleId: Types.ObjectId = res.locals.vehicleId;
        try {
            vehicle = await getVehicleById(vehicleId);
            return res.status(201).json({
                enjoyers: vehicle.enjoyers
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);


router.patch(
    '/myVehicle/vehicleId',
    authenticateToken,
    async (req: BaseVehicleRequest, res: Response) => {
        let vehicle: ProjectVehicleDocument
        let vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId)
        try {
            vehicle = await getVehicleById(vehicleId)
            return res.status(201).json({
                myVehicle: vehicle
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

router.patch(
    '/myVehicle/vehicleId/owner',
    authenticateToken,
    async (req: BaseVehicleRequest, res: Response) => {
        let vehicle: ProjectVehicleDocument
        let vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId)
        try {
            vehicle = await getVehicleById(vehicleId)
            return res.status(201).json({
                owner: vehicle.owner
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);


router.patch(
    '/myVehicle/vehicleId/enjoyers',
    authenticateToken,
    async (req: BaseVehicleRequest, res: Response) => {
        let vehicle: ProjectVehicleDocument
        let vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId)
        try {
            vehicle = await getVehicleById(vehicleId)
            return res.status(201).json({
                enjoyers: vehicle.enjoyers
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

router.delete(
    '/myVehicle/vehicleId',
    authenticateToken,
    // superUserAuth, TO DO implementa sto middleware e controlla che lo user sia admin per deletare una car
    async (req: BaseVehicleRequest, res: Response) => {
        const vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId);
        try {
            await deleteVehicle({ _id: vehicleId });
            return res.status(204).json();
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

router.post(
    '/myVehicle/create',
    authenticateToken,
    // superUserAuth, TO DO implementa sto middleware e controlla che lo user sia admin per creare una car
    async (req: VehicleCreationRequest, res: Response) => {
        try {
            await createVehicle(req.body);
            return res.status(204).json();
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);


router.put(
    '/myVehicle/vehicleId/enjoyers',
    authenticateToken,
    async (req: UpdateEnjoyerRequest, res: Response) => {
        const { vehicleId, enjoyerId, enjoyerName, enjoyerSurname } = req.body;
        let vehicle: ProjectVehicleDocument
        if (enjoyerId) {
            try {
                vehicle = await getVehicleById(new Types.ObjectId(vehicleId))
                if (req.query.action === "add") {
                    const onComplete = (result: string) => {
                        if (result === "false") return res.send(403).json();
                        else return res.send(204).json()
                    }
                    await vehicle.addEnjoyer(
                        new Types.ObjectId(enjoyerId),
                        enjoyerName,
                        enjoyerSurname,
                        ioServer,
                        onComplete
                    );
                }
                else {
                    await vehicle.removeEnjoyer(new Types.ObjectId(enjoyerId));
                    return res.status(200).json({});
                }
            } catch (err) {
                // TO DO togli
                if (!(err instanceof ServerError)) {
                    return res.status(500).json({
                        timestamp: toUnixSeconds(new Date()),
                        errorMessage: err.message,
                        requestPath: req.path,
                    });
                }
                //fino a qua

                return res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                });
            }
        } else {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: 'Wrong parameters',
                requestPath: req.path,
            });
        }
    }
);

router.put("/myVehicle/vehicleId/owner",
            // superUserAuth, TO DO implementa sto middleware e controlla che lo user sia admin per creare una car,
        async (req: OwnerUpdateRequest, res:Response) => {
            const vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId)
            let vehicle: ProjectVehicleDocument
            try {
                vehicle = await getVehicleById(vehicleId)
                vehicle.owner = new Types.ObjectId(req.body.newOwner)
                vehicle.save().catch(err => Promise.reject(new ServerError("Internal server error")))
                res.status(204).json()
            } catch (err) {
                res.status(err.statusCode).json({
                    timestamp: toUnixSeconds(new Date()),
                    errorMessage: err.message,
                    requestPath: req.path,
                })
            }

    }
)
