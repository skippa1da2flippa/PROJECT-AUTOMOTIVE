import { User, UserRoles, UserStatus } from '../../src/model/database/user';
import {
    apiCredentials,
    DocId,
    MongoDbApi,
    MongoDbSingleInsertResponse,
    MongoDpApiCredentials,
} from './mongodb-api';


export const knownBcryptDigest = {
    pwdHash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
    pwdSalt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
    clearPassword: 'test',
};

/**
 * Returns data that represents a user in the db.
 * The username has to be unique to avoid conflicts,
 * the other data does not, so it is static.
 */
export const getUserData = (): User => {
    let random = randomInt(100000, 17)
    let date = Date.now()
    return {
        name: `name-${random}-${date}`, 
        surname: `surname-${random}-${date}`,
        nickname: `nickname-${random}-${date}`,
        email: `email-${random}-${date}@project.com`,
        pwd_hash: knownBcryptDigest.pwdHash,
        salt: knownBcryptDigest.pwdSalt,
        roles: [UserRoles.Base],
        status: UserStatus.Online,
        stats: {
            sauce: 0,
            thropies: 0
        },
        enjoyedVehicles: [],
        docs: [],
        setting: {
            theme: "#FFFFF",
            size: 3,
            language: "EN",
            gamificationHide: false
        },
        routines: [],
        notifications: [],
    };
};

export interface InsertedUser {
    userId: string;
    userData: User;
}

export const insertUser = async (userData?: User): Promise<InsertedUser> => {
    const mongoDbApi: MongoDbApi = new MongoDbApi(apiCredentials);

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
    const mongoDbApi: MongoDbApi = new MongoDbApi(apiCredentials);

    await mongoDbApi.deleteMultipleUsers(userIds);
};


function randomInt(max: number, min: number) {
    return Math.floor(Math. random() * (max - min + 1)) + min;
}

