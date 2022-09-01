import * as dotenv from 'dotenv';
import * as path from 'path';
import * as http from 'http';
import express, {Express} from 'express';
import {registerRoutes} from './routes/utils/register-routes';
import cors from 'cors';
import * as io from 'socket.io';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import chalk from 'chalk';
import {ServerJoinedListener} from "./events/client-listeners/server-joined"
import {OwnerResponseListener} from "./events/client-listeners/owner-response-listener"
import {TedisPool} from "tedis";
import {FriendRequestAcceptedListener} from "./events/client-listeners/friend-request-accepted";
import {createUser, UserDocument, UserModel, UserSchema} from "./model/database/user";
import {createVehicle, ModelTypes} from "./model/database/my-vehicle";
import {Notification, NotTypes} from "./model/database/notification";
import mongoose = require('mongoose');
import filter = require('content-filter');
import {Types} from "mongoose";


// Remember that the runtime working dir is <root>/dist/src
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const app: Express = express();

/* Endpoints base url */
export const API_BASE_URL: string = "/api";

/* True if testing, false otherwise. Allows other modules to know if we're in testing mode */
export const IS_TESTING_MODE: boolean = process.env.TEST === 'true';

// If testing, set test db uri, else use the other
export const dbUri: string = IS_TESTING_MODE ? process.env.TEST_DB_URI as string  : process.env.DB_URI as string;
const serverPort: number = parseInt(process.env.PORT, 10);

const serverHost: string = process.env.HOST as string ;


const redisPort = parseInt(process.env.REDIS_PORT)
// Redis pool set-up
export const pool = new TedisPool({
    port: redisPort,
    host: "127.0.0.1",
    password: process.env.REDIS_PASSWORD as string
});


/* Database Connection */
console.log('Demanding the sauce...');

(
    mongoose
    .connect(dbUri, {})
    .then(async () => {
        console.log('Sauce received!');
        let ted = await pool.getTedis()
        try {
            let users = await UserModel.find().catch(err => { console.log("LA findALL ha fallito")})
            if (!users) {
                let data: UserDocument = await createUser({
                    name: "ash",
                    surname: "catchEm",
                    email: "mew@pokemon.com",
                    nickname: "All",
                    salt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
                    pwd_hash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
                    notifications: [
                        {
                            sender: new Types.ObjectId(),
                            type: NotTypes.carOccupied
                        }
                    ]

                })
                const vehicleData = await createVehicle({
                    type: ModelTypes.projectZ,
                    pwd_hash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
                    salt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
                    owner: data.id
                })

                console.log("user: ")
                console.log(data._id)
                console.log("and his vehicle: ")
                console.log(vehicleData._id)
            }
        } catch(err) {
            console.log("errore o della create user o della vehicle")
        }

    })
    .catch((err) => {
        console.log('Error Occurred during Mongoose Connection');
        console.log(err);
    })

)

export const httpServer: http.Server = http.createServer(app);
httpServer.listen(serverPort, serverHost, () => {
    console.log(`HTTP Server started on ${serverHost}:${serverPort}`);
});

/* Allows server to respond to a particular request that asks which request options it accepts */
app.use(cors());

/* Alternative to bodyparser which is deprecated */
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// Allow cross-origin
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

/* Sanitize input to avoid NoSQL injections */
app.use(filter({ methodList: ['GET', 'POST', 'PATCH', 'DELETE'] }));

/* Express Requests and Responses logger */
const verboseLogging: boolean = process.env.VERBOSE === 'true';
if (verboseLogging) {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');

    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json(),
                winston.format.prettyPrint({
                    colorize: true,
                })
            ),
            meta: true, // Enable logging of metadata
            msg: 'HTTP {{req.method}} {{req.url}} | {{res.statusCode}} {{res.responseTime}}ms',
        })
    );
}

/* Register express routes */
registerRoutes(app);

/* socket.io server setup */
export const ioServer: io.Server = new io.Server(httpServer, {
    cors: {
        methods: ['GET', 'POST'],
        credentials: false,
    },
});

ioServer.on('connection', async function (client: io.Socket) {
    console.log(chalk.bgGreen(`socket.io client ${client.id} connected`));

    // A client joins its private room, so that the server has a way//
    // to send request specifically to him
    const serverJoined: ServerJoinedListener = new ServerJoinedListener(client, ioServer);
    serverJoined.listen();

    const ownerCarControl: OwnerResponseListener =  new OwnerResponseListener(client)
    ownerCarControl.listen()

    const friendRequestAccepted: FriendRequestAcceptedListener = new FriendRequestAcceptedListener(client, ioServer)
    friendRequestAccepted.listen()

    client.on('disconnect', function () {
        console.log(chalk.bgRed(`socket.io client ${client.id} disconnected`));
    });
});

