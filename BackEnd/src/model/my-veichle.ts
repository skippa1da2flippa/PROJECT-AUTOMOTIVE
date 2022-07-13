import { Schema, SchemaTypes, Types, Document } from 'mongoose';
import { Server } from 'socket.io';
import { OwnerResponseListener } from '../events/client-listeners/owner_response-listener';
import { EnjoyerRequestEmitter } from '../events/emitters/enjoyer-request-emitter';
import { LegalInfos, LegalInfosSchema, LegalInfosSubDocument } from '../model/legalInfos'

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


export interface projectVeichleSubDocument extends projectVeichle, Document {
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


export const myVeichleSchema = new Schema<projectVeichleSubDocument>(
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


// TO DO remember to put in the front-end the 60 sec linit for the owner to answer
myVeichleSchema.methods.addEnjoyer = async function (enjoyerId: Types.ObjectId, ioServer: Server) : Promise<void> {
    const enojerReqEmitter: EnjoyerRequestEmitter = new EnjoyerRequestEmitter(ioServer, this.owner)
    // TO DO should i receive in input enjoyerName and enjoyerSurname or should i retrieve by my self?
    enojerReqEmitter.emit({
        enjoyerId: enjoyerId.toString(),
        enjoyerName: "",
        enjoyerSurname: "",
        veichleId: this._id.toString(),
        veichleModel: this.type
    })


    // check redis if the value is true or false then pop the pair from redis 




    // do this if true
    this.enjoyers.push(enjoyerId)
    await this.save().catch(err => Promise.reject(new Error("Internal server error")))
    return Promise.resolve()

    // else
    return Promise.reject(new Error("Internal server error"))
}

myVeichleSchema.methods.removeEnjoyer = async function (enjoyerId: Types.ObjectId) : Promise<void> {
    this.enjoyers = this.enjoyer.filter((elem: Types.ObjectId) => elem !== enjoyerId)
    await this.save().catch(err => Promise.reject(new Error("Internal server error")))
    return Promise.resolve()
}

