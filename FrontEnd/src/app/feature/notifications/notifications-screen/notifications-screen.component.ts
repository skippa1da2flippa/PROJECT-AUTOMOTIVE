import {Component, OnInit} from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {NotificationApi} from "../../../core/api/handlers/notification-api";
import {
    InteractiveNotification,
    Notification,
    NotTypes,
    WholeNotificationData
} from "../../../core/model/response-data/notification-data";
import {FriendRequestAcceptedEmitter} from "../../../core/events/emitters/friend-request-accepted";
import {User} from "../../../core/model/response-data/user";
import {UserApi} from "../../../core/api/handlers/user-api";
import {NotificationReceivedListener} from "../../../core/events/listeners/notification-received";
import {NotificationDeletedListener} from "../../../core/events/listeners/notification-deleted";


@Component({
  selector: 'app-notifications-screen',
  templateUrl: './notifications-screen.component.html',
  styleUrls: ['./notifications-screen.component.css']
})
export class NotificationsScreenComponent extends ErrorHandler implements OnInit {
    private meh: User = new User()
    public notifications: WholeNotificationData[] = []
    private interactiveNotification: InteractiveNotification

    constructor(
        public override router: Router,
        private userApi: UserApi,
        private notificationApi: NotificationApi,
        private friendRequestAcceptedEmitter: FriendRequestAcceptedEmitter,
        private notificationReceivedListener: NotificationReceivedListener,
        private notificationDeletedListener: NotificationDeletedListener,
    ) {
        super(router)
        this.interactiveNotification = new InteractiveNotification(this.userApi, this.router)
    }

    ngOnInit(): void {

        const pollingDeletedNotifications = (notification: Notification) => {
            this.notifications.forEach(this.forEachNotificationDeleter(notification.sender))
        };

        const pollingNewNotifications = (notification: Notification) => {
            this.interactiveNotification.getWholeNotification(notification.type, notification.sender)
        };

        pollingDeletedNotifications.bind(this);
        pollingNewNotifications.bind(this);

        this.notificationReceivedListener.listen(pollingNewNotifications)
        this.notificationDeletedListener.listen(pollingDeletedNotifications)

        this.notificationApi.getMyNotifications().subscribe({
            next: (data: Notification[]) => {
                data.forEach(elem => {
                    this.notifications.push(
                        this.interactiveNotification.getWholeNotification(elem.type, elem.sender)
                    )
                }, this)
            },
            error: super.errorHandler
        })

        this.userApi.getMeh().subscribe({
            next: (data: User) => {
                this.meh = data
            },
            error: super.errorHandler
        })
    }

    ngOnDestroy(): void {
        this.notificationReceivedListener.unListen()
        this.notificationDeletedListener.unListen()
    }

    public acceptFriendRequest(senderId: string){
        this.friendRequestAcceptedEmitter.emit({
            receiverId: senderId,
            senderId: this.meh.userId
        })

        this.notifications.forEach(this.forEachNotificationDeleter(senderId))
    }

    public deleteNotification(data: Notification) {
        //TODO add as a input parameter the sender
        this.notificationApi.removeNotification(data.type)
    }


    private forEachNotificationDeleter(id: string)  {
        return (not:WholeNotificationData, i: number, vet: WholeNotificationData[]) => {
            if (not.id === id && not.type === NotTypes.friendRequest)
                vet.splice(i)
        }
    }
}
