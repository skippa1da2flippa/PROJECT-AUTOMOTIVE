import mongoose, { Schema, SchemaTypes, Types, Document, Model, AnyKeys, FilterQuery } from 'mongoose';
import { Server } from 'socket.io';
import { pool } from '../..';
import { EnjoyerRequestEmitter } from '../../events/emitters/enjoyer-request-emitter';
import { LegalInfos, LegalInfosSchema, LegalInfosSubDocument } from './legalInfos'
import { ServerError } from "../errors/server-error"

/*
    This collection is thought not to be an embedded document due to the fact that many users can use the same veichle, setting this schema as 
    a normal collection will probably allow us to code faster while devolping who can control the veichle through this app
*/


export enum ModelTypes {
    projectZ = 'projectZ'
    // cars names
}


export interface projectVeichle {
    
    /**
     * Defines the car model 
     */
    type: ModelTypes, 

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
    createdAt: Date;

    /**
     * Date that the notification was last updated at.
     * It is automatically inserted and updated by the database
     */
    updatedAt?: Date;
}


export interface projectVeichleDocument extends projectVeichle, Document {
    legalInfos: LegalInfosSubDocument;

    /**
     * This function add a userId to the 'enjoyers' array
     * @param userId represent the enjoyer id to insert
     * @param ioServer used to implement web socket connection 
     */
    addEnjoyer(enjoyerId: Types.ObjectId, ioServer: Server) : Promise<void>;

    /**
     * This function remove a userId from the 'enjoyers' array
     * @param userId represent the enjoyer id to remove
     */
    removeEnjoyer(enjoyerId: Types.ObjectId) : Promise<void>
}

// TO DO implement remove owner/change owner in a safe way


export const myVeichleSchema = new Schema<projectVeichleDocument>(
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
 * @param ioServer 
 * @param onComplete this thing should be built like this: 
 * const onComplete = (result: string): void => {
      if (result === "false") {
         // ...
         res.send(403).json();
      }
      else {
         // ...
         res.send(204).json();
      }
   };
 */
myVeichleSchema.methods.addEnjoyer = async function (
    enjoyerId: Types.ObjectId, 
    ioServer: Server, 
    onComplete: (res: string) => void
    ) : Promise<void> {

    let res: string = ""
    let temp: any
    const enojerReqEmitter: EnjoyerRequestEmitter = new EnjoyerRequestEmitter(ioServer, this.owner)
    
    // TO DO should i receive in input enjoyerName and enjoyerSurname or should i retrieve them by my self?
    enojerReqEmitter.emit({
        enjoyerId: enjoyerId.toString(),
        enjoyerName: "",
        enjoyerSurname: "",
        veichleId: this._id.toString(),
        veichleModel: this.type
    })

    // gets a connection from the pool
    let tedis = await pool.getTedis()

    // TO DO to check
    let interval = setInterval(async () => {
        res = !(temp = await tedis.get(this.ownwer.toString())) ? "" : temp as string
        if (res === "true") {
            this.enjoyers.push(enjoyerId)
            await this.save()
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

myVeichleSchema.methods.removeEnjoyer = async function (enjoyerId: Types.ObjectId) : Promise<void> {
    this.enjoyers = this.enjoyer.filter((elem: Types.ObjectId) => elem !== enjoyerId)
    await this.save().catch(err => Promise.reject(new ServerError("Internal server error")))
    return Promise.resolve()
}

export const VeichleModel: Model<projectVeichleDocument> = mongoose.model('MyVeichle', myVeichleSchema, 'MyVeichles');

export async function getCarById(carId: Types.ObjectId): Promise<projectVeichleDocument> {
    const carDoc = await VeichleModel.findOne({ _id: carId }).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !carDoc
        ? Promise.reject(new ServerError('No car with that identifier'))
        : Promise.resolve(carDoc);
}

export async function createCar(data: AnyKeys<projectVeichleDocument>): Promise<projectVeichleDocument> {
    const car: projectVeichleDocument = new VeichleModel(data);
    return car.save()
}

export async function deleteUser(filter: FilterQuery<projectVeichleDocument>): Promise<void> {
    const obj: { deletedCount?: number } = await VeichleModel.deleteOne(filter).catch((err) =>
        Promise.reject(new ServerError('Internal server error'))
    );

    return !obj.deletedCount
        ? Promise.reject(new ServerError('No car with that identifier'))
        : Promise.resolve();
} 