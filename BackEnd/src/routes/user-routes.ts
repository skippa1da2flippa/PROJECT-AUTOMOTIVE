import { Types } from 'mongoose';
import { Router, Response } from 'express';
import * as usr from '../model/database/user';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import { retrieveUserId, retrieveId, skipLimitChecker } from './utils/param-checking';
import { authenticateToken } from './auth-routes';
import { 
    projectVehicleDocument, 
    getVehiclesByUserId, 
    getVehicleById
} from '../model/database/my-vehicle'
import {ServerError} from "../model/errors/server-error";




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
interface UserEndpointResponse extends Response {
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

interface UpdatePasswordRequest extends AuthenticatedRequest {
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

interface UpdateEnjoyeBody {
    enjoyedVehicle: string
}

interface UpdateEnjoyedRequest extends AuthenticatedRequest{
    body: UpdateEnjoyeBody
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
    '/users/@meh/myVehicles',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let vehicles: projectVehicleDocument[]
        const userId: Types.ObjectId = res.locals.userId;
        console.log("DENTRO LA ROUTE")
        try {
            vehicles = await getVehiclesByUserId(userId)
            console.log("USERID" + userId)
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
        let enjoyedVehicles: projectVehicleDocument[] = []
        try {
            user = await usr.getUserById(userId);
            console.log("ENJOYER LEN: " + user.enjoyedVehicles.length)
            if (!(user.enjoyedVehicles.length)) throw new ServerError( "No enjoyed vehicles related to this user")
            // TO DO possiamo migliorare i tempi d'attesa embeddando gli enjoyed vehicle in user
            for (const idx in user.enjoyedVehicles) {
                enjoyedVehicles.push(await getVehicleById(user.enjoyedVehicles[idx]))
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
                await usr.updatePassword(userId, password);
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
                return res.sendStatus(204).json({email});
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
    '/users/@meh/enjoyedVehicles',
    authenticateToken,
    retrieveUserId,
    async (req: UpdateEnjoyedRequest, res: UserEndpointResponse) => {
        const { enjoyedVehicle } = req.body;
        const userId: Types.ObjectId = res.locals.userId;
        if (enjoyedVehicle) {
            try {
                if (req.query.action === "add") {
                    await usr.updateUserEnjoyedVehicle(userId, new Types.ObjectId(enjoyedVehicle));
                    return res.sendStatus(204).json({
                        added: enjoyedVehicle
                    });
                }
                else {
                    await usr.removeUserEnjoyedVehicle(userId, new Types.ObjectId(enjoyedVehicle));
                    return res.sendStatus(204).json({
                        removed: enjoyedVehicle
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





