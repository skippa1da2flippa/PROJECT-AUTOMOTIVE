import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-local';

import {
    createUser,
    getUserByNickname,
    UserDocument,
    setUserStatus,
    UserStatus
} from '../model/database/user';
import { AnyKeys, Types } from 'mongoose';
import { ioServer } from '../index';
import { JwtData } from '../model/auth/jwt-data';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import { Socket } from 'socket.io';
import chalk from 'chalk';

export const router = Router();

// TO DO add second token creation

/**
 * This function verifies the authentication token that comes with each
 * request to an authenticated endpoint.
 *
 * @param req request
 * @param res response
 * @param next function to move to the next middleware
 */
export const authenticateToken = function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err: any, content: JwtData) => {
        if (err)
            return res.status(403).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });

        // Here the content of the token is assigned
        // to its own request field, so that each endpoint
        // can access it
        req.jwtContent = content;

        next();
    });
};

/**
 *  Function provided to passport middleware which verifies user credentials
 */
const localAuth = async function (nickName: string, email: string, password: string, done: Function) {
    let user: UserDocument | void = await getUserByPair(name, surname).catch((err: Error) => {
        return done(err);
    });

    if (user && (await user.validatePassword(password))) {
        return done(null, user);
    } else {
        return done(null, false);
    }
};
passport.use(new Strategy(localAuth));

interface AuthenticationRequestBody {
    nickname: string;
    password: string;
}

interface SignInRequest extends Request {
    body: AuthenticationRequestBody;

    /**
     * Field inserted by passport-local authentication middleware
     */
    user: UserDocument;
}

/**
 *  Login endpoint, check the authentication and generate the jwt
 */
router.post(
    '/auth/signin',
    passport.authenticate('local', { session: false }),
    async (req: SignInRequest, res: Response) => {
        const tokenData: JwtData = {
            userId: req.user._id,
        };

        // Token generation with 30 sec duration (just for log in)
        const logInSignedToken = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '30sec',
        });

        // Token generation with 30 min duration (just for roaming in the app)
        const sessionSignedToken = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '30min',
        });

        // Block login if the user is already logged and online
        if (
            req.user.status !== UserStatus.Offline 
        ) {
            return res.status(401).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: `User ${req.user.nickname} is already online`,
                requestPath: req.path,
            });
        }

    
        // Return the token along with the id of the authenticated user
        return res.status(200).json({
            userId: req.user._id,
            logInToken: logInSignedToken,
            sessionToken: sessionSignedToken
        });
    }
);

interface SignUpRequest extends Request {
    body: AuthenticationRequestBody;
}

/**
 * Request must contain at least this information -> username: string, password: string
 */
router.post('/auth/signup', async (req: SignUpRequest, res: Response) => {
    try {
        // A user that registers through this endpoint becomes online right away
        const userData: AnyKeys<UserDocument> = {
            nickname: req.body.nickname,

            // User is created with status Offline.
            // He will be set to online when he logs in
            status: UserStatus.Offline,
        };
        const newUser: UserDocument = await createUser(userData);

        await newUser.setPassword(req.body.password);

        return res.status(201).json({
            userId: newUser._id,
            nickname: newUser.nickname,
            roles: newUser.roles,
            status: newUser.status,
        });
    } catch (err) {
        return res.status(400).json({
            timestamp: toUnixSeconds(new Date()),
            errorMessage: err.message,
            requestPath: req.path,
        });
    }
});

router.post(
    '/auth/signout',
    authenticateToken,
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId: string = req.jwtContent.userId;

            // Get the client of the user that is logging out and remove it
            // from the room of that user
            // If the room doesn't exist, clientIds is undefined
            const clientIds: Set<string> | undefined = ioServer.sockets.adapter.rooms.get(userId);
            if (clientIds) {
                if (clientIds.size > 1) {
                    throw new Error(
                        "There shouldn't be more than one client listening to a specific user room"
                    );
                }

                // Logout could be called even by a client that
                // didn't connect to the socket.io server
                if (clientIds.size === 1) {
                    const logoutClientId: string = clientIds.values().next().value;
                    const logoutClient: Socket = ioServer.sockets.sockets.get(logoutClientId);
                    logoutClient.leave(userId);

                    console.log(chalk.red.bold(`User ${userId} left the server`));
                }
            }

            // Set the status of the user to Offline since it's logging out
            await setUserStatus(new Types.ObjectId(userId), UserStatus.Offline);

            return res.status(204).json();
        } catch (err) {
            return res.status(400).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);
