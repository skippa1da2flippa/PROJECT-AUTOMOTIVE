import { Types } from 'mongoose';
import {Router, Response, Request} from 'express';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import {retrieveId, retrieveUserId, retrieveVehicleId, skipLimitChecker} from './utils/param-checking';
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
import {addRoutine, getSaltNdHash, getUserById, updatePsw, UserDocument} from "../model/database/user";
import {UpdatePasswordRequest} from "./user-routes";
import {Routine} from "../model/database/routine";

// TODO add || "" to every invocation of: new Types.ObjectId(req.body.wht)
// TODO add accessToken to all the @it endpoints

interface UserVehicleEndpointLocals {
    newAccessToken: string
}

interface UserVehicleEndPointResponse extends Response{
    locals: UserVehicleEndpointLocals
}


export interface UserVehicle {
    name: string,
    surname: string,
    status: string
    userId: string,
    email: string,
    nickname: string
}


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

interface RoutineCreationBody {
    saucerId: string,
    name: string,
    temperature: number,
    lightsColor: string,
    music: string[],
    path: string
}

export interface UserRoutineCreationRequest extends AuthenticatedRequest {
    body: RoutineCreationBody
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
        let user: UserDocument
        try {
            vehicle = await getVehicleById(vehicleId);
            user = await getUserById(vehicle.owner)
            return res.status(201).json({
                name: user.name,
                surname:user.surname,
                status: user.status,
                userId: user._id,
                email: user.email,
                nickname: user.nickname
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
        let users: UserVehicle[] = []
        try {
            vehicle = await getVehicleById(vehicleId);
            for(let idx in vehicle.enjoyers){
                let user = await getUserById(vehicle.enjoyers[idx])
                users.push({
                    name: user.name,
                    surname:user.surname,
                    userId: user._id,
                    status: user.status,
                    email: user.email,
                    nickname: user.nickname
                })
            }
            return res.status(201).json({
                enjoyers: users
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

router.post(
    '/myVehicle/@it/saucer/routines',
    authenticateToken,
    retrieveVehicleId,
    async (req: UserRoutineCreationRequest, res: VehicleEndpointResponse) => {
        let userId = new Types.ObjectId(req.body.saucerId)
        let user: UserDocument
        try {
            user = await getUserById(userId)
            const routine: Routine = {
                name: req.body.name + "/" + userId,
                temperature: req.body.temperature,
                path: req.body.path,
                lightsColor: req.body.lightsColor,
                music: req.body.music
            }
            await addRoutine(userId, routine)
            return res.status(204).json()
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
    async (req: BaseVehicleRequest, res: UserVehicleEndPointResponse) => {
        let vehicle: ProjectVehicleDocument
        let user: UserDocument
        let owner: UserVehicle
        let enjoyers: UserVehicle[] = []
        try {
            let vehicleId: Types.ObjectId = retrieveId(req.body.vehicleId, false)
            vehicle = await getVehicleById(vehicleId)
            user = await getUserById(vehicle.owner)
            owner = {
                name: user.name,
                status: user.status,
                surname:user.surname,
                userId: user._id,
                email: user.email,
                nickname: user.nickname
            }
            for(let idx in vehicle.enjoyers){
                let enjoyer = await getUserById(vehicle.enjoyers[idx])
                enjoyers.push({
                    name: enjoyer.name,
                    surname:enjoyer.surname,
                    status: user.status,
                    userId: enjoyer._id,
                    email: enjoyer.email,
                    nickname: enjoyer.nickname
                })
            }
            return res.status(201).json({
                vehicleId: vehicle._id,
                type: vehicle.type,
                owner: owner,
                enjoyers: enjoyers,
                legalInfos: vehicle.legalInfos,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
    async (req: BaseVehicleRequest, res: UserVehicleEndPointResponse) => {
        let vehicle: ProjectVehicleDocument
        let user: UserDocument
        try {
            let vehicleId: Types.ObjectId = retrieveId(req.body.vehicleId, false)
            vehicle = await getVehicleById(vehicleId)
            user = await getUserById(vehicle.owner)
            return res.status(201).json({
                name: user.name,
                surname:user.surname,
                userId: user._id,
                email: user.email,
                nickname: user.nickname,
                status: user.status,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
    async (req: BaseVehicleRequest, res: UserVehicleEndPointResponse) => {
        let vehicle: ProjectVehicleDocument
        let enjoyers: UserVehicle[] = []
        try {
            let vehicleId: Types.ObjectId = retrieveId(req.body.vehicleId, false)
            vehicle = await getVehicleById(vehicleId)
            for(let idx in vehicle.enjoyers){
                let user = await getUserById(vehicle.enjoyers[idx])
                enjoyers.push({
                    name: user.name,
                    surname:user.surname,
                    status: user.status,
                    userId: user._id,
                    email: user.email,
                    nickname: user.nickname
                })
            }
            return res.status(201).json({
                enjoyers,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
    async (req: BaseVehicleRequest, res: UserVehicleEndPointResponse) => {
        try {
            let vehicleId: Types.ObjectId = retrieveId(req.body.vehicleId, false)
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
    // superUserAuth, TODO implementa sto middleware e controlla che lo user sia admin per creare una car
    async (req: VehicleCreationRequest, res: UserVehicleEndPointResponse) => {
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
                vehicleId,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
    async (req: UpdateEnjoyerRequest, res: UserVehicleEndPointResponse) => {
        const { vehicleId, enjoyerId, enjoyerName, enjoyerSurname } = req.body;
        if (enjoyerId) {
            try {
                if (req.query.action === "add") {
                    const onComplete = (result: string) => {
                        if (result === "false") return res.sendStatus(403).json();
                        else return res.sendStatus(204)
                    }

                    // TODO add check if they friend
                    return await addEnjoyer(
                        retrieveId(vehicleId, false),
                        retrieveId(enjoyerId),
                        enjoyerName,
                        enjoyerSurname,
                        ioServer,
                        onComplete
                    );
                }
                else {
                    await removeEnjoyer(
                        retrieveId(vehicleId, false),
                        retrieveId(enjoyerId),
                    );
                    return res.status(200).json({
                        removed: enjoyerId,
                        accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
    // superUserAuth, TODO implementa sto middleware e controlla che lo user sia admin per cambiare owner car,
    async (req: OwnerUpdateRequest, res: UserVehicleEndPointResponse) => {
        try {
            const vehicleId: Types.ObjectId = retrieveId(req.body.vehicleId, false)
            const ownerId: Types.ObjectId = retrieveId(req.body.newOwner)
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

