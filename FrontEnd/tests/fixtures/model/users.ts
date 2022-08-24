import {
    DocId,
    getApiCredentials,
    MongoDbApi,
    MongoDbSingleInsertResponse,
    MongoDpApiCredentials,
} from './mongodb-api/mongodb-api';
import { randomInt } from 'crypto';
import {Types} from "mongoose";
import {UserStatus} from "../../../src/app/core/model/response-data/user";

export const knownBcryptDigest = {
    pwdHash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
    pwdSalt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
    clearPassword: 'test',
};

export interface Routine {

    //routine name
    name: string

    //AC temperature
    temperature: number,

    //this may need to be represented as a whole collection if it's more than just one set of lights
    lightsColor: string,

    //represent which genre is related to a certain routine
    music: string[]

    //correct the type
    path: any
}

interface Document {
    type: string
    content: string
    expiresOn: Date
}

export class User {
    public readonly userId?: string
    public readonly email: string
    public readonly nickname: string
    public readonly name: string
    public readonly surname: string
    public readonly status: UserStatus
    public friends: string[] = []
    public pwd_hash: string = ""
    public salt: string = ""
    public roles: string[] = []
    public stats: UserStats = {
        sauce: 10,
        trophies: 10
    }
    public enjoyedVehicles = []
    public docs: Document[] = []
    public setting: Object = {}
    public routines: Routine[] = []
    public notifications: Notification[] = []

    constructor(
        userId: string = "",
        email: string = "",
        nickname: string = "",
        name: string = "",
        surname: string = "",
        status: UserStatus = UserStatus.Online
    ) {
        this.userId = userId
        this.email = email
        this.nickname = nickname
        this.name = name
        this.surname = surname
        this.status = status
    }
}

export interface UserStats {
    sauce: number;
    trophies: number; // create a thropies collection representing what to do to win it and its rules, and its state for unlocking it
    //many others
}

export enum NotTypes {
    carOccupied = 'carOccupied',
    destReached = 'destReached', // pop up not a real not
    fuelAlmostOut = 'fuelAlmostOut', // pop up not a real not
    friendRequest = 'friendRequest',
    placeHolder = 'placeHolder'
    // many others
}

export interface Notification {
    /**
     * Type of the notification
     */
    type: NotTypes;

    /**
     * Id of the user that sent the notification
     */
    sender: Types.ObjectId;

    /**
     * Date that the notification was created at.
     * It is automatically inserted by the database
     */
    createdAt?: Date;

    /**
     * Date that the notification was last updated at.
     * It is automatically inserted and updated by the database
     */
    updatedAt?: Date;
}


/**
 * Returns data that represents a user in the db.
 * The username has to be unique to avoid conflicts,
 * the other data does not, so it is static.
 */
export const getUserData = (enjoyedVehicles = [], status: UserStatus = UserStatus.Offline, friend?: string): User => {
    let random = randomInt(17, 100000)
    let friends = friend ? [friend] : []
    let date = Date.now()
    return {
        name: `name-${random}-${date}`,
        surname: `surname-${random}-${date}`,
        nickname: `nickname-${random}-${date}`,
        friends: friends,
        email: `email-${random}-${date}@project.com`,
        pwd_hash: knownBcryptDigest.pwdHash,
        salt: knownBcryptDigest.pwdSalt,
        roles: [],
        status: status,
        stats: {
            sauce: 0,
            trophies: 0
        },
        enjoyedVehicles: enjoyedVehicles,
        docs: [{
            type: `name-${random}-${date}`,
            content: "DAJE",
            expiresOn: new Date()
        }],
        setting: {
            theme: "#FFFFF",
            size: 3,
            language: "EN",
            gamificationHide: false
        },
        routines: [{
            name: `lilBoat`,
            temperature: 3,
            lightsColor: "#FFFFF",
            music: ["punk"],
            path: "AYO"
        }],
        notifications: [{
            type: NotTypes.carOccupied,
            sender: new Types.ObjectId()
        }],
    };
};

export interface InsertedUser {
    userId: string;
    userData: User;
}

export interface InsertedUser {
    userId: string;
    userData: User;
}

export const insertUser = async (userData?: User): Promise<InsertedUser> => {
    const apiCred: MongoDpApiCredentials = await getApiCredentials();
    const mongoDbApi: MongoDbApi = new MongoDbApi(apiCred);

    userData = userData ? userData : getUserData();
    const insertUserRes: MongoDbSingleInsertResponse = await mongoDbApi.insertUser(userData);
    const userId: string = insertUserRes.insertedId.toString();

    return {
        userId: userId,
        userData: userData,
    };
};

export const deleteUser = async (userId: DocId): Promise<void> => {
    return deleteMultipleUsers([userId]);
};

export const deleteMultipleUsers = async (userIds: DocId[]): Promise<void> => {
    const apiCred: MongoDpApiCredentials = await getApiCredentials();
    const mongoDbApi: MongoDbApi = new MongoDbApi(apiCred);

    await mongoDbApi.deleteMultipleUsers(userIds);
};
