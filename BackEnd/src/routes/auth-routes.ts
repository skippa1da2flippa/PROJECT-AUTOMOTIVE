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
    UserStatus,
    getUserByEmail
} from '../model/database/user';
import { AnyKeys, Types } from 'mongoose';
import { ioServer } from '../index';
import { JwtData } from '../model/auth/jwt-data';
import { AuthenticatedRequest } from './utils/authenticated-request';
import { toUnixSeconds } from './utils/date-utils';
import { Socket } from 'socket.io';
import chalk from 'chalk';

export const router = Router();

// TO DO quando il client riceve la risposta del login deve buildare l'header "Authorization" come segue: Refresh token,Access token.

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
    const authHeaders = req.headers['authorization'];
    const refreshToken = authHeaders && authHeaders.split(',')[0];
    const accessToken = authHeaders && authHeaders.split(',')[1];


    if (refreshToken == null || accessToken == null) return res.sendStatus(403);

    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err: any, content: JwtData) => {
        if (err){

            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err: any, content: JwtData) => {
                if(err){
                    return res.status(403).json({
                        timestamp: toUnixSeconds(new Date()),
                        errorMessage: err.message,
                        requestPath: req.path,
                    });
                }
                else{
                    let accessToken = generateAccessToken(content.userId);
                    res.locals.newAccessToken = accessToken;

                    /* TO DO in every route we must remember to check if locals.newAccessToken is true, if so we should send it's value with the response
                     *  to let client to properly store the new access token for next requests
                     */    
                    req.jwtContent = content;

                    next();
                }

            })

            
        }

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
 const localAuth = async function (password: string, nickName: string = "", email: string = "", done: Function) {

    let user: UserDocument | void

    if (nickName !== "") {
        user = await getUserByNickname(nickName).catch((err: Error) => {
            return done(err);
        });
    }
    else {
        user = await getUserByEmail(email).catch((err: Error) => {
            return done(err);
        });
    }

    if (user && (await user.validatePassword(password))) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}
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

const generateAccessToken = (data: string): string => {

    const tokensData: JwtData = {
        userId: data,
    };
    // Access token generation with 1 min duration (just for roaming in the app)
    let accessT: string = jsonwebtoken.sign(tokensData, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: '60s',
    });

    return accessT;
}


/**
 *  Login endpoint, check the authentication and generate the jwt
 */
router.post(
    '/auth/signin',
    passport.authenticate('local', { session: false }),
    async (req: SignInRequest, res: Response) => {

        const tokensData: JwtData = {
            userId: req.user._id,
        };

        // Refresh token generation with 2 h duration, allow a user to mantain a session and be issued with access tokens
        const refreshToken = jsonwebtoken.sign(tokensData, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '2h',
        });

        const accessToken = generateAccessToken(tokensData.userId);

        // Black login if the user is already logged and online
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
            logInToken: refreshToken,
            sessionToken: accessToken
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
