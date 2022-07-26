import {AuthenticatedRequest} from "./utils/authenticated-request";
import { Router, Response } from 'express';
import {addNotification, getUserById, removeNotification, UserDocument} from "../model/database/user";
import {toUnixSeconds} from "./utils/date-utils";
import {authenticateToken} from "./auth-routes";
import {retrieveId, retrieveUserId, retrieveVehicleId} from "./utils/param-checking";
import {ioServer} from "../index";
import {
    getMostRecentNotifications,
    Notification,
    NotificationSubDocument,
    NotTypes
} from "../model/database/notification";
import {Types} from "mongoose";
import {UserEndpointResponse} from "./user-routes";
import {NotificationReceivedEmitter} from "../events/emitters/notification-received";
import {NotificationData} from "../model/events/notification-data";
import {NotificationDeletedEmitter} from "../events/emitters/notification-deleted";
import {VehicleEndpointResponse} from "./my-vehicle-routes";

export const router = Router();

interface PostBody {
    type: string;
    receiver: string;
}

interface NotificationRequest extends AuthenticatedRequest {
    body: PostBody;
}


/**
 *    /users/:userId/notifications | GET | Retrieve the notifications of the specified user
 */
router.get(
    '/users/@meh/notifications',
    authenticateToken,
    retrieveUserId,
    async (req: AuthenticatedRequest, res: Response) => {
        const userId: Types.ObjectId = res.locals.userId;

        try {
            const notifications: NotificationSubDocument[] =
                await getMostRecentNotifications(userId);

            const responseData: Notification[] = notifications.map(
                (n: NotificationSubDocument) => {
                    return {
                        type: n.type,
                        sender: n.sender,
                    };
                }
            );
            return res.status(200).json({ notifications: responseData });
        } catch (err) {
            return res.status(404).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);

/**
 *    /users/:userId/notifications | POST | Add a notification to the specified user
 */
router.post(
    '/users/@meh/notifications',
    authenticateToken,
    retrieveUserId,
    async (req: NotificationRequest, res: UserEndpointResponse) => {
        try {
            const typeBodyParam: string = req.body.type as string;
            const reqType: NotTypes = NotTypes[typeBodyParam as keyof typeof NotTypes];
            const senderId: Types.ObjectId = res.locals.userId;
            const receiverId = new Types.ObjectId(req.body.receiver)

            const not: Notification = {
                type: reqType,
                sender: senderId
            }

            await addNotification(receiverId, not);

            // Notify the user of the new notification
            const notifier = new NotificationReceivedEmitter(ioServer, receiverId);

            const notificationData: NotificationData = {
                type: reqType,
                sender: senderId.toString(),
            };
            notifier.emit(notificationData);

            return res.status(201).json(notificationData);
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);



router.post(
    '/api/myVehicle/@it/notifications',
    authenticateToken,
    retrieveVehicleId,
    async (req: NotificationRequest, res: VehicleEndpointResponse) => {
        const vehicleId: Types.ObjectId = res.locals.vehicleId;

        try {
            const typeBodyParam: string = req.body.type as string;

            const reqType: NotTypes = NotTypes[typeBodyParam as keyof typeof NotTypes];
            const receiverId = new Types.ObjectId(req.body.receiver)
            const senderId: Types.ObjectId = res.locals.vehicleId

            const not: Notification = {
                type: reqType,
                sender: senderId
            }

            await addNotification(receiverId, not);

            // Notify the user of the new notification
            const notifier = new NotificationReceivedEmitter(ioServer, receiverId);

            const notificationData: NotificationData = {
                type: reqType,
                sender: senderId.toString(),
            };
            notifier.emit(notificationData);

            return res.status(201).json(notificationData);
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);



/**
 *   /users/:userId/notifications | DELETE | Remove the notification from the specified user
 *   Query params: type, sender
 */
router.delete(
    '/users/@meh/notifications',
    authenticateToken,
    retrieveUserId,
    async (req: NotificationRequest, res: Response) => {
        const userId: Types.ObjectId = res.locals.userId;

        try {
            const typeQParam: string = req.query.type as string;
            const senderQParam: string = req.query.sender as string;

            const reqType: NotTypes = NotTypes[typeQParam as keyof typeof NotTypes];
            const senderObjId: Types.ObjectId = retrieveId(senderQParam);


            const notification = {
                type: reqType,
                sender: senderObjId
            }

            await removeNotification(userId, notification);

            return res.status(204).json();
        } catch (err) {
            return res.status(err.statusCode).json({
                timestamp: toUnixSeconds(new Date()),
                errorMessage: err.message,
                requestPath: req.path,
            });
        }
    }
);