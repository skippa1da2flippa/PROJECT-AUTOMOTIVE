import { Schema, SchemaTypes, Types, Document } from 'mongoose';


export interface LegalInfos {
    // many fields

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

export interface LegalInfosSubDocument extends LegalInfos, Types.Subdocument {}

export const LegalInfosSchema = new Schema<LegalInfosSubDocument>(
    {
        
    },
    {
        _id: false,
        timestamps: true
    }
)