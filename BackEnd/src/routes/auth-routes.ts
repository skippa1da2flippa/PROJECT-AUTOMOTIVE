import {NextFunction, Request, Response, Router} from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import {Strategy} from 'passport-local';

import {
    createUser,
    getSaltNdHash,
    getUserByEmail,
    setUserStatus,
    UserDocument,
    UserStatus
} from '../model/database/user';
import {AnyKeys, Types} from 'mongoose';
import {ioServer} from '../index';
import {JwtData} from '../model/auth/jwt-data';
import {AuthenticatedRequest} from './utils/authenticated-request';
import {toUnixSeconds} from './utils/date-utils';
import {Socket} from 'socket.io';
import chalk from 'chalk';
import {getVehicleById, ProjectVehicleDocument} from "../model/database/my-vehicle";
import {ServerError} from "../model/errors/server-error";
import {BanListPool} from "../model/ban-list/ban-list-pool";
import {retrieveUserId} from "./utils/param-checking";

export const router = Router();
export const jsonWebToken = jsonwebtoken

/**
 * This function verifies the authentication token that comes with each
 * request to an authenticated endpoint.
 *
 * @param req request
 * @param res response
 * @param next function to move to the next middleware
 */
export const authenticateToken = async function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    console.log("sono dentro la authenticate token")
    const authHeaders = req.headers['authorization'];
    const refreshToken = authHeaders && authHeaders.split(',')[0];
    const accessToken = authHeaders && authHeaders.split(',')[1];

    // salvo nella ban-pool se manca un token
    if (refreshToken == null || accessToken == null) {
        if (refreshToken) await BanListPool.insertElem(refreshToken)
        return res.sendStatus(403);
    }

    // controllo se il token è bannato
    if (await BanListPool.isBanned(refreshToken)) return res.sendStatus(403);

    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err: any, content: JwtData) => {
        if (err){
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err: any, content: JwtData) => {
                if(err){
                    res.sendStatus(403)
                } else {
                    res.locals.newAccessToken = generateAccessToken(content.Id);
                    /* TO DO in every route we must remember to check if locals.newAccessToken is true,
                    if so we should send it's value with the response
                     *  to let client to properly store the new access token for next requests
                     */    
                    req.jwtContent = content;
                    next()
                }

            })
        }
        else {
            // Here the content of the token is assigned
            // to its own request field, so that each endpoint
            // can access it
            req.jwtContent = content;
            next()
        }
    });

}

/**
 *  Function provided to passport middleware which verifies user credentials
 */

const localAuth = async function (email: string, password: string, done: Function) {
    let user: UserDocument | void

    try {
        user = await getUserByEmail(email)
    } catch(err) {
        return done(null, false, {message: "No user with that identifier"})
    }

    if (user && (await user.validatePassword(password))) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}

/**
 *  Function provided to passport middleware which verifies vehicle credentials
 */
const vehicleAuth = async function (vehicleId: string, password: string, done: Function) {
    let vehicle: ProjectVehicleDocument | void
    try {
        vehicle = await getVehicleById(new Types.ObjectId(vehicleId))
    } catch(err) {
        return done(err)
    }

    if (vehicle && (await vehicle.validatePassword(password))) {
        return done(null, vehicle);
    } else {
        return done(null, false);
    }
}


passport.use(new Strategy(
    {usernameField:"email", passwordField:"password"},
    localAuth
));

passport.use("vehicle", new Strategy(
    {usernameField:"vehicleId", passwordField:"password"},
    vehicleAuth
));

interface AuthenticationRequestBody {
    email: string
    password: string;
}

interface SignUpRequestBody {
    email: string
    nickname?: string;
    password: string;
    name: string
    surname: string
}

interface VehicleRequestBody {
    vehicleId: string
    password: string
}

interface SignInRequest extends Request {
    body: AuthenticationRequestBody;

    /**
     * Field inserted by passport-local authentication middleware
     */
    user: UserDocument;
}

interface SignInVehicleRequest extends Request {
    body: VehicleRequestBody;
}





export const generateAccessToken = (data: string): string => {

    const tokensData: JwtData = {
        Id: data,
    };
    // Access token generation with 1 min duration (just for roaming in the app)
    return jsonwebtoken.sign(tokensData, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: '60s',
    });
}


/**
 *  Login endpoint, check the authentication and generate the jwt
 */
router.post(
    '/auth/signin',
    passport.authenticate('local', { session: false }),
    async (req: SignInRequest, res: Response) => {
        const tokensData: JwtData = {
            Id: req.user._id,
        };
        // Refresh token generation with 2 h duration, allow a user to maintain a session and be issued with access tokens
        const refreshToken = jsonwebtoken.sign(tokensData, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '1h',
        });

        const accessToken = generateAccessToken(tokensData.Id);

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

        await setUserStatus(req.user._id, UserStatus.Online)

        // Return the token along with the id of the authenticated user
        return res.status(200).json({
            userId: req.user._id,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
);

router.post(
    '/auth/myVehicle/signin',
    passport.authenticate('vehicle', { session: false }),
    async (req: SignInVehicleRequest, res: Response) => {

        const tokensData: JwtData = {
            Id: req.body.vehicleId
        };
        // Refresh token generation with 2 h duration, allow a user to maintain a session and be issued with access tokens
        const refreshToken = jsonwebtoken.sign(tokensData, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '30m',
        });

        const accessToken = generateAccessToken(tokensData.Id);


        // Return the token along with the id of the authenticated user
        return res.status(200).json({
            vehicleId: req.body.vehicleId,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
);

interface SignUpRequest extends Request {
    body: SignUpRequestBody;
}


router.post('/auth/signup', async (req: SignUpRequest, res: Response) => {
    const { name, surname, email, password } = req.body
    if (name && surname && email && password) {
        try {
            const data = await getSaltNdHash(req.body.password)
            const userData: AnyKeys<UserDocument> = {
                email: email,
                name: name,
                surname: surname,
                nickname: (req.body.nickname)? req.body.nickname : email,
                salt: data.salt,
                pwd_hash: data.pwdHash,
                status: UserStatus.Offline,
            };
            const newUser: UserDocument = await createUser(userData);

            return res.status(201).json({
                userId: newUser._id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                nickname: newUser.nickname,
                status: newUser.status,
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
            errorMessage: "One or more parameters are null or undefined: (name, surname, email, password)",
            requestPath: req.path,
        });
    }
});

router.get(
    '/auth/signout',
    authenticateToken,
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId: string = req.jwtContent.Id;
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

router.get(
    '/auth/myVehicle/signout',
    authenticateToken,
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            const vehicleId: string = req.jwtContent.Id;
            // Get the client of the user that is logging out and remove it
            // from the room of that user
            // If the room doesn't exist, clientIds is undefined
            const vehicleIds: Set<string> | undefined = ioServer.sockets.adapter.rooms.get(vehicleId);
            if (vehicleIds) {
                if (vehicleIds.size > 1) {
                    throw new ServerError(
                        "There shouldn't be more than one client vehicle listening to a specific vehicle room"
                    );
                }

                // Logout could be called even by a client that
                // didn't connect to the socket.io server
                if (vehicleIds.size === 1) {
                    const logoutClientId: string = vehicleIds.values().next().value;
                    const logoutClient: Socket = ioServer.sockets.sockets.get(logoutClientId);
                    logoutClient.leave(vehicleId);

                    console.log(chalk.red.bold(`Vehicle ${vehicleId} left the server`));
                }
            }

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
