import { Types } from 'mongoose';
import { Router, Response } from 'express';
import * as usr from '../model/database/user';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import { retrieveUserId, skipLimitChecker } from './utils/param-checking';
import { authenticateToken } from './auth-routes';
import {
    ProjectVehicleDocument,
    getVehiclesByUserId,
    getVehicleById, removeEnjoyer
} from '../model/database/my-vehicle'
import {ServerError} from "../model/errors/server-error";
import {getUserById, updatePsw, UserDocument} from "../model/database/user";




interface UserEndpointLocals {
    userId: Types.ObjectId;
    skip: number;
    limit: number;
}

// TO DO probabile sarà necessario creare qualche tipo di relationship tra utenti 
// anche perchè se ci pensi se trovo una macchina di uno sconosciuto e mi voglio connettere
// per ora posso farlo (almeno richiederlo all'owner) quindi ha senso che io posso richiedere
// l'accesso all'owner sse sono amico con l'owner

// TO DO capire bene come usare redis nelle route per migliorare le prestazioni

/**
 * Interface that models the response of a user endpoint
 */
export interface UserEndpointResponse extends Response {
    locals: UserEndpointLocals;
}

interface UpdateStatsBody {
    elo: number;
    topElo: number;
    wins: number;
    losses: number;
    shipsDestroyed: number;
    totalHits: number;
    totalShots: number;
}

interface UpdateStatsRequest extends AuthenticatedRequest {
    body: UpdateStatsBody;
}

interface UpdatePasswordBody {
    password: string;
}

export interface UpdatePasswordRequest extends AuthenticatedRequest {
    body: UpdatePasswordBody;
}

interface UpdateUsernameBody {
    nickname: string;
}

interface UpdateUsernameRequest extends AuthenticatedRequest {
    body: UpdateUsernameBody;
}

interface UpdateEmailBody {
    email: string;
}

interface UpdateEmailRequest extends AuthenticatedRequest {
    body: UpdateEmailBody;
}

interface UpdateEnjoyedBody {
    enjoyedVehicle: string
}

interface UpdateEnjoyedRequest extends AuthenticatedRequest{
    body: UpdateEnjoyedBody
}


export const router = Router();

router.get(
    '/users/@meh',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let user: usr.UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        try {
            user = await usr.getUserById(userId);
            return res.status(201).json({
                userId: user._id,
                nickname: user.nickname,
                name: user.name,
                surname: user.surname,
                email: user.email,
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
    '/users/@meh/friends',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let user: usr.UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        let friends = []
        try {
            user = await usr.getUserById(userId);
            for (let idx in user.friends) {
                let tempUser = await getUserById(user.friends[idx])
                friends.push({
                    id: tempUser._id,
                    name: tempUser.name,
                    surname: tempUser.surname,
                    nickname: tempUser.nickname,
                    email: tempUser.email,
                    // status: tempUser.status TO DO
                })
            }
            return res.status(201).json({
                friends
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
    '/users/@meh/myVehicles',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let vehicles
        const userId: Types.ObjectId = res.locals.userId;
        try {
            vehicles = (await getVehiclesByUserId(userId)).map(elem => {
                return {
                    id: elem._id,
                    owner: elem.owner,
                    status: elem.status,
                    legalInfos: elem.legalInfos,
                    enjoyers: elem.enjoyers,
                    type: elem.type
                }
            })

            return res.status(201).json({
                userId: userId,
                myVehicles: vehicles
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
    '/users/@meh/enjoyedVehicles',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let user: usr.UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        let enjoyedVehicles = []
        try {
            user = await usr.getUserById(userId);
            if (!(user.enjoyedVehicles.length)) throw new ServerError( "No enjoyed vehicles related to this user")
            // TO DO possiamo migliorare i tempi d'attesa embeddando gli enjoyed vehicle in user
            for (const idx in user.enjoyedVehicles) {
                let vehicle = await getVehicleById(user.enjoyedVehicles[idx])
                enjoyedVehicles.push(
                    {
                        Id: vehicle._id,
                        owner: vehicle.owner,
                        status: vehicle.status,
                        legalInfos: vehicle.legalInfos,
                        enjoyers: vehicle.enjoyers,
                        type: vehicle.type
                    }
                )
            }
            return res.status(201).json({
                userId: user._id,
                enjoyedVehicles: enjoyedVehicles
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
    '/users/@meh',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        const userId: Types.ObjectId = res.locals.userId;
        try {
            await usr.deleteUser({ _id: userId });
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


router.patch(
    '/users/@meh/nickname',
    authenticateToken,
    retrieveUserId,
    async (req: UpdateUsernameRequest, res: UserEndpointResponse) => {
        const { nickname } = req.body;

        const userId: Types.ObjectId = res.locals.userId;

        if (nickname) {
            try {
                await usr.updateNickName(userId, nickname);
                return res.status(200).json({ nickname });
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
    '/users/@meh/password',
    authenticateToken,
    retrieveUserId,
    async (req: UpdatePasswordRequest, res: UserEndpointResponse) => {
        const { password } = req.body;
        const userId: Types.ObjectId = res.locals.userId;
        if (password) {
            try {
                await updatePsw(userId, password);
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
    '/users/@meh/email',
    authenticateToken,
    retrieveUserId,
    async (req: UpdateEmailRequest, res: UserEndpointResponse) => {
        const { email } = req.body;
        const userId: Types.ObjectId = res.locals.userId;
        if (email) {
            try {
                await usr.updateEmail(userId, email);
                return res.status(200).json({email: email});
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
    '/users/@meh/enjoyedVehicles/remove',
    authenticateToken,
    retrieveUserId,
    async (req: UpdateEnjoyedRequest, res: UserEndpointResponse) => {
        const { enjoyedVehicle } = req.body;
        const userId: Types.ObjectId = res.locals.userId;
        if (enjoyedVehicle) {
            try {
                await removeEnjoyer(new Types.ObjectId(enjoyedVehicle), userId);
                return res.status(200).json({
                    removed: enjoyedVehicle
                });
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





