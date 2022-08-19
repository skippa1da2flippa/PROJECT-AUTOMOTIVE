import { Socket } from 'ngx-socket-io';
import { Emitter } from './base/emitter';
import { Injectable } from '@angular/core';
import {OwnerResData} from "../../model/events-data/owner-response";
/**
 * Class that wraps socket.io functionality to generate a "server-joined" event.
 * This allows the client to register itself to the socket.io server, so that
 * it can receive data specifically sent to the currently logged user.
 * It also allows the server to detect and update the status of a user,
 * for example setting it online or offline.
 */
@Injectable({
    providedIn: 'root',
})
export class OwnerResponseEmitter extends Emitter<OwnerResData> {
    public constructor(client: Socket) {
        super(client, `owner-response`);
    }
}
