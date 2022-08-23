import { Schema, SchemaTypes, Types } from 'mongoose';

export enum DocTypes {
    driveLicense = 'driveLicense',
    stamp = 'stamp'
    // many others
}

export interface ODocument {

    type: DocTypes,

    content: string, 

    expiresOn: Date,

}

export interface ODocSubDocument extends ODocument, Types.Subdocument {}


export const DocumentSchema = new Schema<ODocSubDocument>(
    {
        type: {
            type: SchemaTypes.String,
            required: true,
            enum: [DocTypes.driveLicense.valueOf(), DocTypes.stamp.valueOf()]
        }, 

        content: {
            type: SchemaTypes.String,
            required: true
        },

        expiresOn: {
            type: SchemaTypes.Date,
            required: true
        }
    }
)