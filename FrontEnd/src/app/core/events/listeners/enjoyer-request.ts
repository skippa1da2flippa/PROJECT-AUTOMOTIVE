
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ServerListener } from './base/server-listener';
import { NotificationData } from '../../model/events-data/notification-data';
import {EnjoyerMessage} from "../../model/events-data/enjoyer-message";

/**
 * Class that wraps socket.io functionality to listen
 * to a 'notification-received' server event.
 * Such event allows the user to be notified when a new request
 * is sent to him.
 */
@Injectable({
    providedIn: 'root',
})
export class EnjoyerRequestListener extends ServerListener<EnjoyerMessage> {
    constructor(client: Socket) {
        super(client, 'enjoyer-request');
    }
}
