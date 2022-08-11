import {Types} from "mongoose";
import {DocId, getApiCredentials, MongoDbApi, MongoDpApiCredentials} from "./mongodb-api/mongodb-api";


export enum ModelTypes {
    projectZ = 'projectZ'
    // cars names
}

export enum VehicleStatus {
    Offline = 'Offline',
    Online = 'Online'
}

export interface projectVehicle {

    /**
     * Defines the car model
     */
    type: ModelTypes,

    /**
     * A car has a password because:
     * access to his own route and receive its token by logging in with its id and its psw
     * PS vehicle psw is meant to be known just to the vehicle
     * */
    pwd_hash: string;

    salt: string;

    status: VehicleStatus;

    /**
     * Defines the car owner
     */
    owner: Types.ObjectId,

    /**
     * Defines other users different from the owner who have access to the car
     */
    enjoyers: Types.ObjectId[],

    /**
     * Defines legal info about the car
     */
    legalInfos: Object

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

export function getVehicleData(userId: Types.ObjectId, enjoyerId?: Types.ObjectId) {
    const enjoyersLst = enjoyerId ? [enjoyerId] : []
    return {
        type: ModelTypes.projectZ,
        owner: userId,
        enjoyers: enjoyersLst,
        legalInfos: {},
        password: "test",
        pwd_hash: '$2b$10$u4YAbPtjj2oCbZWKgFi1NuTqpvHlj2.A7ATGkEy8PM5eSCbZdK/Da',
        salt: '$2b$10$u4YAbPtjj2oCbZWKgFi1Nu',
        status: VehicleStatus.Online
    }
}



export async function insertManyVehicles(
    userId: Types.ObjectId,
    nVehicle: number,
    vehiclesIds: Types.ObjectId[],
    apiCredentials: MongoDpApiCredentials,
    enjoyerId?: Types.ObjectId
) {
    if (nVehicle) {
        let mongoDbApi: MongoDbApi = new MongoDbApi(apiCredentials)
        await insertManyVehicles(userId, nVehicle - 1, vehiclesIds, apiCredentials, enjoyerId)
        let id = (await mongoDbApi.insertVehicle(getVehicleData(userId, enjoyerId))).insertedId
        let vehicleId = (
            id instanceof Types.ObjectId
                ? id
                : new Types.ObjectId(id)
        )
        vehiclesIds.push(vehicleId)
    }
}

export async function deleteVehicle(vehicleId: DocId) {
    const apiCred: MongoDpApiCredentials = await getApiCredentials();
    const mongoDbApi: MongoDbApi = new MongoDbApi(apiCred);
    return mongoDbApi.deleteMultipleVehicles([vehicleId]);
}

export async function deleteMultipleVehicles(vehicleIds: DocId[]) {
    const apiCred: MongoDpApiCredentials = await getApiCredentials();
    const mongoDbApi: MongoDbApi = new MongoDbApi(apiCred);
    return mongoDbApi.deleteMultipleVehicles(vehicleIds);
}
