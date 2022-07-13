import { Server, Socket } from 'socket.io';
import chalk from 'chalk';
import { OwnerResData } from "../../model/events/owner-res-data"
import { ClientListener } from './base/client-listener';

/**
 * Class that wraps socket.io functionality to listen
 * to a 'owner-response' client event.
 * Such event allows the client to join a socket.io room for listeninig
 * specific chat, so that he can listen only to messages of such chat.
 */
 export class OwnerResponseListener extends ClientListener<OwnerResData> {
    constructor(server: Server, client: Socket) {
        super(client, 'owner-response');
    }

    public listen(): void {
        super.listen((data: OwnerResData) => {
            // TO DO i don't know how to warn the enjoyer right now i created 
            // an emitter to emit the enjoyer but i'can't imagine how to do it here
            return (data.res)? Promise.resolve() : Promise.reject()
        })
    }
}