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
    UserDocument,
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
     * This function add a userId to the 'enjoyers' array
     * @param enjoyerId represent the enjoyer id to insert
     * @param enjoyerName represents enjoyer name
     * @param enjoyerSurname represents enjoyer surname
     * @param ioServer used to implement web socket connection
     * @param onComplete used to send a response
     */
    addEnjoyer(enjoyerId: Types.ObjectId, enjoyerName: string, enjoyerSurname: string, ioServer: Server, onComplete:(res: string) => void) : Promise<void>;

    /**
     * This function remove a userId from the 'enjoyers' array
     * @param userId represent the enjoyer id to remove
     */
    removeEnjoyer(enjoyerId: Types.ObjectId) : Promise<void>

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
/**
 *
 * @param enjoyerId
 * @param enjoyerName
 * @param enjoyerSurname
 * @param ioServer
 * @param onComplete
  */
myVehicleSchema.methods.addEnjoyer = async function (
    enjoyerId: Types.ObjectId, 
    enjoyerName: string,
    enjoyerSurname: string,
    ioServer: Server, 
    onComplete: (res: string) => void
    ) : Promise<void> {

    let res: string = ""
    let temp: any
    const enjoyerReqEmitter: EnjoyerRequestEmitter = new EnjoyerRequestEmitter(ioServer, this.owner)
    
    enjoyerReqEmitter.emit({
        enjoyerId: enjoyerId.toString(),
        enjoyerName: enjoyerName,
        enjoyerSurname: enjoyerSurname,
        vehicleId: this._id.toString(),
        vehicleModel: this.type
    })

    // gets a connection from the pool
    let tedis = await pool.getTedis()

    // TO DO to check
    let interval = setInterval(async () => {
        res = !(temp = await tedis.get(this.ownwer.toString())) ? "" : temp as string
        if (res === "true") {
            this.enjoyers.push(enjoyerId)
            await this.save()
            await updateUserEnjoyedVehicle(enjoyerId, this._id)
            onComplete(res)
        }
        else if (res === "false") onComplete(res)
    }, 5000)
    
    setTimeout(async () => {
        clearInterval(interval)
        if (res === "") onComplete("false")
         
        //pop the pair
        await tedis.del(this.owner.toString())

        // gives back the connection 
        pool.putTedis(tedis)
    }, 60000)
}

myVehicleSchema.methods.removeEnjoyer = async function (enjoyerId: Types.ObjectId) : Promise<void> {
    this.enjoyers = this.enjoyer.filter((elem: Types.ObjectId) => elem !== enjoyerId)
    await this.save().catch(err => Promise.reject(new ServerError("Internal server error")))
    await removeUserEnjoyedVehicle(enjoyerId, this._id)
    return Promise.resolve()
}

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

export async function createVehicle(data: AnyKeys<ProjectVehicleDocument>): Promise<ProjectVehicleDocument> {
    const vehicle: ProjectVehicleDocument = new VehicleModel(data);
    return vehicle.save()
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
        console.log(vehicles)
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

/**
 * Sets the status of the provided user to the provided value
 * and notifies his friends of the change.
 * @param userId id of the user whose status has to be changed
 * @param newStatus new status of the user
 * @return updated user
 * @private
 */
export const setVehicleStatus = async (
    vehicleId: Types.ObjectId,
    newStatus: VehicleStatus
): Promise<ProjectVehicleDocument> => {
    let vehicle: ProjectVehicleDocument = await getVehicleById(vehicleId);
    vehicle.status = newStatus;
    return  vehicle.save();
};




