import { Schema, SchemaTypes, Types, Document } from 'mongoose';
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
    type: ModelTypes, 

    drivers: Types.ObjectId[],

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
    legalInfos: LegalInfosSubDocument
}


export const myVeichleSchema = new Schema<projectVeichleSubDocument>(
    {
        type: {
            type: SchemaTypes.String,
            required: true,
            enum: [ModelTypes.projectZ.valueOf()]
        },

        legalInfos: {
            type: LegalInfosSchema,
            default: () => ({})
        },

        drivers: {
            type: [SchemaTypes.ObjectId],
            default: []
        }
    }, 
    {_id: false, timestamps: true}
)