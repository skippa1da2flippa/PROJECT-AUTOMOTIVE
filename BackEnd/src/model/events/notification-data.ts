import { NotTypes } from '../database/notification';

export interface NotificationData {
    /**
     * Type of the notification
     */
    type: NotTypes;

    /**
     * Id of the user that sent the notification
     */
    sender: string;
}
