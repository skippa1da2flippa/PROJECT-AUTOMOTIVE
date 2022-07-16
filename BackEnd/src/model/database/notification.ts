import { Schema, SchemaTypes, Types } from 'mongoose';

// deletable

/**
 * Enumeration that defines all the possible notification model receivable by a user
 */
export enum NotTypes {
    carOccupied = 'carOccupied',
    destReached = 'destReached', // pop up not a real not
    fuelAlmostOut = 'fuelAlmostOut', // pop up not a real not
    // many others
}

/**
 * Interface that represents a User notification not meant to represent 
 * annoying pop up notification like "Someone wants to connect to your car" but
 * simple notification as "carOccupied"
 */
export interface Notification {
    /**
     * Type of the notification
     */
    type: NotTypes;

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

/**
 * Interface that represents a notification sub-document
 */
 export interface NotificationSubDocument extends Notification,
    Types.Subdocument {}


/**
 * A notification is identified by the type
 */
 export const NotificationSchema = new Schema<NotificationSubDocument>(
    {
        type: {
            type: SchemaTypes.String,
            required: true,
            enum: [NotTypes.carOccupied.valueOf(), NotTypes.destReached.valueOf()],
        }
    },
    { timestamps: true }
);
