import { Schema, SchemaTypes, Types } from 'mongoose';
import {UserDocument, UserModel, UserSchema} from "./user";
import mongoose from "mongoose";

// deletable

/**
 * Enumeration that defines all the possible notification model receivable by a user
 */
export enum NotTypes {
    carOccupied = 'carOccupied',
    destReached = 'destReached', // pop up not a real not
    fuelAlmostOut = 'fuelAlmostOut', // pop up not a real not
    friendRequest = 'friendRequest',
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
     * Id of the user that sent the notification
     */
    sender: Types.ObjectId;

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
            enum: [NotTypes.carOccupied.valueOf(), NotTypes.friendRequest.valueOf()],
        },
        sender: {
            type: SchemaTypes.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

export const NotificationModel = mongoose.model('Notification', NotificationSchema, 'Notification');
/**
 * Returns the most recent notifications of the user, ordered by most recent.
 * @param userId id of the user to retrieve the notifications of
 */
export async function getMostRecentNotifications(
    userId: Types.ObjectId
): Promise<NotificationSubDocument[]> {
    const not: UserDocument = await UserModel.findOne({ _id: userId.toString() }, { notifications: 1 }).sort({
        createdAt: -1,
    });
    return not.notifications;
}
