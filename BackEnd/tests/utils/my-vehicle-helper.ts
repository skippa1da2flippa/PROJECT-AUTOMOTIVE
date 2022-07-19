import { Types } from "mongoose";
import { ModelTypes } from "../../src/model/database/my-vehicle";
import { apiCredentials, MongoDbApi } from "./mongodb-api";


export function getVehicleData(userId: Types.ObjectId, enjoyerId?: Types.ObjectId) {
    const enjoyersLst = enjoyerId ? [enjoyerId] : []
    return {
        type: ModelTypes.projectZ,
        owner: userId,
        enjoyers: enjoyersLst,
        legalInfos: {},
    }
}

export async function insertManyVehicles(userId: Types.ObjectId, nVehicle: number, vehiclesIds: Types.ObjectId[], enjoyerId?: Types.ObjectId) {
    if (nVehicle) {
        let mongoDbApi: MongoDbApi = new MongoDbApi(apiCredentials)
        await insertManyVehicles(userId, nVehicle - 1, vehiclesIds, enjoyerId)
        let id = (await mongoDbApi.insertVehicle(getVehicleData(userId, enjoyerId))).insertedId
        let vehicleId = (
            id instanceof Types.ObjectId 
                ? id 
                : new Types.ObjectId(id)
        )
        vehiclesIds.push(vehicleId)
    }
}

