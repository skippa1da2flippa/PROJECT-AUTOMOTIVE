import * as mongoose from 'mongoose';
import { AnyKeys, Document, FilterQuery, Model, Schema, SchemaTypes, Types } from 'mongoose';
import { Server } from 'socket.io';
import { pool } from '../..';
import { EnjoyerRequestEmitter } from '../../events/emitters/enjoyer-request-emitter';
import { LegalInfos, LegalInfosSchema, LegalInfosSubDocument } from './legalInfos'
import { ServerError } from "../errors/server-error"
import {
    getUserById,
    removeUserEnjoyedVehicle,
    updateUserEnjoyedVehicle,
    UserDocument, UserModel,
    UserSchema,
    UserStatus
} from './user';
import bcrypt from "bcrypt";

/*
    This collection is thought not to be an embedded document due to the fact that many users can use the same Vehicle, setting this schema as 
    a normal collection will probably allow us to code faster while devolping who can control the Vehicle through this app
*/


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
    legalInfos: LegalInfos

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


export interface ProjectVehicleDocument extends projectVehicle, Document {
    legalInfos: LegalInfosSubDocument;


    /**
     * Set a new password using bcrypt hashing and salt generation functions
     * @param pwd new password to set
     */
    setPassword(pwd: string): Promise<UserDocument>;

    /**
     * Check the validity of the password with the one stored on the database
     * @param pwd the password to check
     */
    validatePassword(pwd: string): Promise<boolean>;
}

// TO DO implement remove owner/change owner in a safe way


export const myVehicleSchema = new Schema<ProjectVehicleDocument>(
    {
        type: {
            type: SchemaTypes.String,
            required: true,
            index: true,
            enum: [ModelTypes.projectZ.valueOf()]
        },

        owner: {
            type: SchemaTypes.ObjectId,
            required: true
        },

        salt: {
            type: SchemaTypes.String,
            required: false
        },

        pwd_hash: {
            type: SchemaTypes.String,
            required: false
        },

        legalInfos: {
            type: LegalInfosSchema,
            default: () => ({})
        },

        enjoyers: {
            type: [SchemaTypes.ObjectId],
            default: []
        }
    }, 
    {timestamps: true}
)


// TO DO remember to put in the front-end the 60 sec limit for the owner to answer and answer anyway


myVehicleSchema.methods.setPassword = async function (pwd: string): Promise<ProjectVehicleDocument> {
    const salt: string = await bcrypt
        .genSalt(10)
        .catch((error) =>
            Promise.reject(new ServerError('Error with salt generation'))
        );

    const pwdHash = await bcrypt
        .hash(pwd, salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    this.salt = salt;
    this.pwd_hash = pwdHash;
    return this.save();
};

myVehicleSchema.methods.validatePassword = async function (pwd: string): Promise<boolean> {
    const hashedPw = await bcrypt
        .hash(pwd, this.salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    return this.pwd_hash === hashedPw;
};

export const VehicleModel: Model<ProjectVehicleDocument> = mongoose.model('MyVehicle', myVehicleSchema, 'MyVehicles');

export async function getVehicleById(vehicleId: Types.ObjectId): Promise<ProjectVehicleDocument> {
    const carDoc = await VehicleModel.findOne({ _id: vehicleId }).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !carDoc
        ? Promise.reject(new ServerError('No vehicle with that identifier'))
        : Promise.resolve(carDoc);
}

export async function createVehicle(data: AnyKeys<ProjectVehicleDocument>): Promise<Types.ObjectId> {
    const vehicle: ProjectVehicleDocument = new VehicleModel(data);
    await vehicle.save().catch(err => Promise.reject(new ServerError("Server internal error")))
    return Promise.resolve(vehicle._id)
}

export async function deleteVehicle(filter: FilterQuery<ProjectVehicleDocument>): Promise<void> {
    let vehicle: ProjectVehicleDocument
    try {
        vehicle = await getVehicleById(filter._id)
        for (let idx in vehicle.enjoyers) {
            await removeUserEnjoyedVehicle(vehicle.enjoyers[idx], vehicle._id)
        }
    } catch(err) {
        return Promise.reject(err)
    }

    const obj: { deletedCount?: number } = await VehicleModel.deleteOne(filter).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !obj.deletedCount
        ? Promise.reject(new ServerError('No vehicle with that identifier'))
        : Promise.resolve();
} 

export async function getVehiclesByUserId(userId: Types.ObjectId): Promise<ProjectVehicleDocument[]> {
    let vehicles: ProjectVehicleDocument[] = []
    try {
        vehicles = await VehicleModel.find()
        // TO DO un giorno forse si mettera meglio
        vehicles = vehicles.filter(elem => elem.owner.toString() === userId.toString())

    } catch(err) {
        return Promise.reject(new ServerError('Internal server error'))
    }

    return vehicles.length
        ? Promise.resolve(vehicles)
        : Promise.reject(new ServerError("No vehicles related to the user"))
}



export async function updatePassword(_id: Types.ObjectId, password: string): Promise<void> {
    let vehicle: ProjectVehicleDocument;
    try {
        vehicle = await getVehicleById(_id);
        await vehicle.setPassword(password);
    } catch (err) {
        return Promise.reject(err);
    }
    return Promise.resolve();
}


export const setVehicleStatus = async (
    vehicleId: Types.ObjectId,
    newStatus: VehicleStatus
): Promise<ProjectVehicleDocument> => {
    let vehicle: ProjectVehicleDocument = await getVehicleById(vehicleId);
    vehicle.status = newStatus;
    return  vehicle.save();
};

/**
 * This function add a userId to the 'enjoyers' array
 * @param vehicleId represents the vehicle to update
 * @param enjoyerId represent the enjoyer id to insert
 * @param enjoyerName represents enjoyer name
 * @param enjoyerSurname represents enjoyer surname
 * @param ioServer used to implement web socket connection
 * @param onComplete used to send a response
 */
export async function addEnjoyer(
    vehicleId: Types.ObjectId,
    enjoyerId: Types.ObjectId,
    enjoyerName: string,
    enjoyerSurname: string,
    ioServer: Server,
    onComplete: (res: string) => void
) : Promise<void> {
    let vehicle: ProjectVehicleDocument
    let res: string = ""
    let temp: any

    vehicle = await getVehicleById(vehicleId)

    const enjoyerReqEmitter: EnjoyerRequestEmitter = new EnjoyerRequestEmitter(ioServer, vehicle.owner)


    for (let idx in vehicle.enjoyers) {
        if (vehicle.enjoyers[idx].toString() === enjoyerId.toString())
            return Promise.reject(new ServerError("Users already inside the enjoyers"))
    }

    enjoyerReqEmitter.emit({
        enjoyerId: enjoyerId.toString(),
        enjoyerName: enjoyerName,
        enjoyerSurname: enjoyerSurname,
        vehicleId: vehicleId.toString(),
        vehicleModel: vehicle.type
    })


    // gets a connection from the pool
    let tedis = await pool.getTedis()

    // TO DO to check
    let interval = setInterval(async () => {
        res = !(temp = await tedis.get(vehicle.owner.toString())) ? "" : temp as string
        if (res === "true") {
            await VehicleModel.findByIdAndUpdate(vehicleId, {
                $push: { enjoyers: enjoyerId }
            }).catch(err => Promise.reject(new ServerError("Internal server error")))
            await updateUserEnjoyedVehicle(enjoyerId, vehicleId)
            onComplete(res)
        }
        else if (res === "false") onComplete(res)
    }, 5000)

    setTimeout(async () => {
        clearInterval(interval)
        if (res === "") onComplete("false")

        //pop the pair
        await tedis.del(vehicle.owner.toString())

        // gives back the connection
        pool.putTedis(tedis)
    }, 60000)
}

export async function updateVehiclePsw(vehicleId: Types.ObjectId, psw: string) {
    const salt: string = await bcrypt
        .genSalt(10)
        .catch((error) =>
            Promise.reject(new ServerError('Error with salt generation'))
        );

    const pwdHash = await bcrypt
        .hash(psw, salt)
        .catch((error) =>
            Promise.reject(new ServerError('Error with password encryption'))
        );

    let result = await VehicleModel.findByIdAndUpdate(vehicleId, {
        salt: salt,
        pwd_hash: pwdHash
    }).catch(err => Promise.reject(new ServerError("Internal server error")))

    if (!result) return Promise.reject(new ServerError("No vehicle with that identifier"))

    return Promise.resolve()
}


export async function changeOwner(vehicleId: Types.ObjectId, ownerId: Types.ObjectId): Promise<void> {
    let result = await  VehicleModel.findByIdAndUpdate(vehicleId, {
         owner: ownerId
    }).catch(err => Promise.reject(new ServerError("Internal server error")))

    if (!result) return Promise.reject(new ServerError("No user with that identifier"))

    if (result.owner === ownerId) return Promise.reject(new ServerError("User already owner of the car"))

    return Promise.resolve()
}


export async function removeEnjoyer(vehicleId: Types.ObjectId, enjoyerId: Types.ObjectId) : Promise<void> {
    let vehicle: ProjectVehicleDocument = await getVehicleById(new Types.ObjectId(vehicleId))

    let result = await VehicleModel.findByIdAndUpdate(vehicleId, {
        $pull: { enjoyers: enjoyerId }
    }).catch(err => Promise.reject(new ServerError("Internal server error")))

    if (!result) return Promise.reject(new ServerError("No user with that identifier"))
    await removeUserEnjoyedVehicle(enjoyerId, this._id)
    return Promise.resolve()
}


