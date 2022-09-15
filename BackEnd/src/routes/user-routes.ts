import { Types } from 'mongoose';
import { Router, Response } from 'express';
import * as usr from '../model/database/user';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import { retrieveUserId, skipLimitChecker } from './utils/param-checking';
import { authenticateToken } from './auth-routes';
import {
    getVehiclesByUserId, removeEnjoyer, VehicleStatus, ModelTypes, getFullVehicleData, getUserVehicle
} from '../model/database/my-vehicle'
import {ServerError} from "../model/errors/server-error";
import {getUserById, updatePsw, User, UserDocument, validateEmail} from "../model/database/user";
import {UserVehicle} from "./my-vehicle-routes";
import {LegalInfos} from "../model/database/legalInfos";


interface SingleFriendRequestBody {
    friendId: string
}

interface OneUserRequestBody {
    userId: string
}

interface SingleFriendRequest extends AuthenticatedRequest {
    body: SingleFriendRequestBody
}

interface OneUserRequest extends AuthenticatedRequest {
    body: OneUserRequestBody
}


interface UserEndpointLocals {
    userId: Types.ObjectId;
    skip: number;
    limit: number;
    newAccessToken: string;
}

export interface MyVehicle {
    vehicleId: string,
    owner: UserVehicle,
    status: VehicleStatus,
    legalInfos: LegalInfos,
    enjoyers: UserVehicle[],
    type: ModelTypes
}

/**
 * Interface that models the response of a user endpoint
 */
export interface UserEndpointResponse extends Response {
    locals: UserEndpointLocals;
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
        let user: UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        try {
            user = await getUserById(userId);
            return res.status(201).json({
                userId: user._id,
                nickname: user.nickname,
                name: user.name,
                surname: user.surname,
                email: user.email,
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


router.get(
    '/users/@meh/friends',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let user: usr.UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        let friends: UserVehicle[] = []
        try {
            user = await usr.getUserById(userId);
            for (let idx in user.friends) {
                friends.push(
                    await getUserVehicle(user.friends[idx])
                )
            }
            return res.status(201).json({
                friends,
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


router.get(
    '/users/@meh/myVehicles',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let vehicles: MyVehicle[]
        const userId: Types.ObjectId = res.locals.userId;
        try {
            vehicles = await getVehiclesByUserId(userId)
            return res.status(201).json({
                userId: userId,
                myVehicles: vehicles,
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


router.get(
    '/users/@meh/enjoyedVehicles',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: UserEndpointResponse) => {
        let user: UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        let enjoyedVehicles: MyVehicle[] = []
        try {
            user = await usr.getUserById(userId);
            if (!(user.enjoyedVehicles.length)) throw new ServerError( "No enjoyed vehicles related to this user")
            // TO DO possiamo migliorare i tempi d'attesa embeddando gli enjoyed vehicle in user
            for (const idx in user.enjoyedVehicles) {
                enjoyedVehicles.push(
                    await getFullVehicleData(user.enjoyedVehicles[idx])
                )
            }
            return res.status(201).json({
                userId: user._id,
                enjoyedVehicles: enjoyedVehicles,
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
    '/users/@meh/friends/friendId',
    authenticateToken,
    retrieveUserId,
    async (req: SingleFriendRequest, res: UserEndpointResponse) => {
        let user: usr.UserDocument;
        const userId: Types.ObjectId = res.locals.userId;
        let tempUser: UserDocument
        let flag = false
        try {
            let friendId = new Types.ObjectId(req.body.friendId)
            user = await getUserById(userId);

            for(const id of user.friends) {
                if (id.toString() === friendId.toString())
                    flag = true
            }

            if (!flag) throw new ServerError("No friend with that identifier")

            tempUser = await getUserById(friendId)

            return res.status(201).json({
                userId: tempUser._id,
                name: tempUser.name,
                surname: tempUser.surname,
                nickname: tempUser.nickname,
                email: tempUser.email,
                status: tempUser.status,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
            })
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

// TODO endpoint to retrieve one user (may be deleted later in the process)
router.patch(
    '/users/@meh/one',
    authenticateToken,
    retrieveUserId,
    async (req: OneUserRequest, res: UserEndpointResponse) => {
        let tempUser: UserDocument
        try {
            let userId = new Types.ObjectId(req.body.userId)
            tempUser = await getUserById(userId)

            return res.status(201).json({
                userId: tempUser._id,
                name: tempUser.name,
                surname: tempUser.surname,
                nickname: tempUser.nickname,
                email: tempUser.email,
                status: tempUser.status,
                accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
            })
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
                return res.status(200).json({
                    nickname,
                    accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
        if (email && validateEmail(email)) {
            try {
                await usr.updateEmail(userId, email);
                return res.status(200).json({
                    email: email,
                    accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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
                    removed: enjoyedVehicle,
                    accessToken: res.locals.newAccessToken ? res.locals.newAccessToken : ""
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





