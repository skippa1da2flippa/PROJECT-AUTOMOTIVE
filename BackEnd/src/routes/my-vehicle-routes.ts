import { Types } from 'mongoose';
import {Router, Response, Request} from 'express';
import * as usr from '../model/database/user';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import {retrieveUserId, retrieveVehicleId, skipLimitChecker} from './utils/param-checking';
import { authenticateToken } from './auth-routes';
import {
    ProjectVehicleDocument,
    getVehicleById,
    ModelTypes,
    deleteVehicle,
    createVehicle,
    addEnjoyer,
    removeEnjoyer,
    changeOwner,
    updateVehiclePsw
} from '../model/database/my-vehicle'
import {LegalInfos} from "../model/database/legalInfos";
import {ioServer} from "../index";
import {getSaltNdHash, getUserById, updatePsw, UserDocument} from "../model/database/user";
import {UpdatePasswordRequest, UserEndpointResponse} from "./user-routes";
import {ServerError} from "../model/errors/server-error";


interface  VehicleEndpointLocals {
    vehicleId: Types.ObjectId
}

export interface VehicleEndpointResponse extends Response {
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

interface UserRoutineBody {
    saucerId: string
}

interface UserRoutineRequest extends AuthenticatedRequest {
    body: UserRoutineBody
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
    '/myVehicle/@it/saucer/routines',
    authenticateToken,
    retrieveVehicleId,
    async (req: UserRoutineRequest, res: VehicleEndpointResponse) => {
        let userId = new Types.ObjectId(req.body.saucerId)
        let user: UserDocument
        try {
            user = await getUserById(userId)
            return res.status(201).json({
                routines: user.routines
            })
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
)

router.patch(
    '/myVehicle/@it/password',
    authenticateToken,
    retrieveVehicleId,
    async (req: UpdatePasswordRequest, res: VehicleEndpointResponse) => {
        const { password } = req.body;
        const vehicleId: Types.ObjectId = res.locals.vehicleId;
        if (password) {
            try {
                await updateVehiclePsw(vehicleId, password);
                return res.sendStatus(204);
            } catch (err) {
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


router.patch(
    '/myVehicle/vehicleId',
    authenticateToken,
    async (req: BaseVehicleRequest, res: Response) => {
        let vehicle: ProjectVehicleDocument
        let vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId)
        try {
            vehicle = await getVehicleById(vehicleId)
            return res.status(201).json({
                vehicleId: vehicle._id,
                type: vehicle.type,
                owner: vehicle.owner,
                enjoyers: vehicle.enjoyers,
                legalInfos: vehicle.legalInfos
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
    '/myVehicle/:vehicleId',
    authenticateToken,
    // superUserAuth, TO DO implementa sto middleware e controlla che lo user sia admin per deletare una car
    async (req: BaseVehicleRequest, res: Response) => {
        const vehicleId: Types.ObjectId = new Types.ObjectId(req.params.vehicleId);
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
            const data = await getSaltNdHash(req.body.password)
            const vehicleData = {
                type: req.body.type,
                owner: req.body.owner,
                legalInfos: req.body.legalInfos,
                pwd_hash: data.pwdHash,
                salt: data.salt
            }
            let vehicleId = await createVehicle(vehicleData);
            return res.status(200).json({
                vehicleId
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


router.put(
    '/myVehicle/vehicleId/enjoyers',
    authenticateToken,
    async (req: UpdateEnjoyerRequest, res: Response) => {
        const { vehicleId, enjoyerId, enjoyerName, enjoyerSurname } = req.body;
        let vehicle: ProjectVehicleDocument
        if (enjoyerId) {
            try {
                if (req.query.action === "add") {
                    const onComplete = (result: string) => {
                        if (result === "false") return res.send(403).json();
                        else return res.send(204).json()
                    }
                    await addEnjoyer(
                        new Types.ObjectId(vehicleId),
                        new Types.ObjectId(enjoyerId),
                        enjoyerName,
                        enjoyerSurname,
                        ioServer,
                        onComplete
                    );

                    return res.status(200).json({
                        added: enjoyerId
                    });
                }
                else {
                    await removeEnjoyer(
                        new Types.ObjectId(vehicleId),
                        new Types.ObjectId(enjoyerId)
                    );
                    return res.status(200).json({
                        removed: enjoyerId
                    });
                }
            } catch (err) {
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

router.put(
    "/myVehicle/vehicleId/owner",
    // superUserAuth, TO DO implementa sto middleware e controlla che lo user sia admin per creare una car,
    async (req: OwnerUpdateRequest, res:Response) => {
        const vehicleId: Types.ObjectId = new Types.ObjectId(req.body.vehicleId)
        const ownerId: Types.ObjectId = new Types.ObjectId(req.body.newOwner)
        try {
            await changeOwner(vehicleId, ownerId)
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

