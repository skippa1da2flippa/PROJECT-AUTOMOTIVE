import { Server, Socket } from 'socket.io';
import { Types } from 'mongoose';
import chalk from 'chalk';

import { FriendStatusChangedEmitter } from '../emitters/friend-status-changed';
import { FriendStatusChangedData } from '../../model/events/friend-status-changed-data';
import {addFriendship, getUserById, removeNotification, UserDocument, UserStatus} from '../../model/database/user';
import { NotTypes } from '../../model/database/notification';
import { ClientListenerNotifier } from './base/client-listener-notifier';
import { RequestAcceptedData } from '../../model/events/request-accepted-data';

/**
 * Class that wraps socket.io functionality to listen
 * to a 'friend-request-accepted' client event.
 * Such event happens when a user accepts a friend request.
 * The user that sent the request is then notified that his new friend
 * is online.
 */
export class FriendRequestAcceptedListener extends ClientListenerNotifier<RequestAcceptedData> {
    /**
     * @param client that raised the event
     * @param ioServer server instance used to send notifications to the client
     */
    constructor(client: Socket, ioServer: Server) {
        super(ioServer, client, 'friend-request-accepted');
    }

    public listen(): void {
        super.listen(async (eventData: RequestAcceptedData): Promise<void> => {
            try {
                // Add the relationship to both users
                await FriendRequestAcceptedListener.createNewRelationship(eventData);

                // Notify the new friend about the accepted request and
                // the fact that a new friend is online
                this.notifyNewFriend(eventData);
            } catch (err) {
                if (err instanceof Error) {
                    console.log(
                        chalk.bgRed(`Could not accept friend request between users 
                    ${eventData.senderId} and ${eventData.receiverId}.
                    Reason: ${err.message}`)
                    );
                }
            }

            // Even if the friend request couldn't be accepted, try to remove the notification
            // to avoid further errors
            try {
                // remove the now old notification
                // from the user that received the friend request
                await FriendRequestAcceptedListener.removeNotification(eventData);
            } catch (err) {
                if (err instanceof Error) {
                    console.log(
                        chalk.bgRed(`Could not remove notification from user 
                    ${eventData.receiverId}. Reason: ${err.message}`)
                    );
                }
            }
        });
    }

    /**
     * Add a relationship to both users involved in the friend request
     * @param eventData
     * @private
     */
    private static async createNewRelationship(eventData: RequestAcceptedData): Promise<void> {
        await addFriendship(new Types.ObjectId(eventData.senderId), new Types.ObjectId(eventData.receiverId));
    }

    /**
     * Remove the notification from the notified user (the friend that accepted the request)
     * @param eventData
     * @private
     */
    private static async removeNotification(eventData: RequestAcceptedData): Promise<void> {
        const receiverId: Types.ObjectId = new Types.ObjectId(eventData.receiverId);
        const notifiedUser: UserDocument = await getUserById(receiverId);

        // Friend from the perspective of the notified user
        const senderId: Types.ObjectId = new Types.ObjectId(eventData.senderId);
        await removeNotification(senderId, NotTypes.friendRequest);
    }

    /**
     * Notifies the sender of the friend request that the latter has been accepted
     * and that the has a new online friend
     * @param eventData
     * @private
     */
    private notifyNewFriend(eventData: RequestAcceptedData): void {
        const senderNotifier: FriendStatusChangedEmitter = new FriendStatusChangedEmitter(
            this.ioServer,
            new Types.ObjectId(eventData.senderId)
        );
        const statusChangedData: FriendStatusChangedData = {
            friendId: eventData.receiverId,
            status: UserStatus.Online,
        };

        senderNotifier.emit(statusChangedData);
    }
}
