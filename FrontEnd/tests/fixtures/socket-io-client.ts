import { SocketIoModule, Socket, SocketIoConfig } from 'ngx-socket-io';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';

import { environment } from '../../src/environments/environment';
import { ServerJoinedEmitter } from '../../src/app/core/events/emitters/server-joined';
import {OwnerResponseEmitter} from "../../src/app/core/events/emitters/owner-response";

const sIoConfig: SocketIoConfig = {
    url: environment.serverBaseUrl,
    options: {},
};

/**
 * Returns the necessary testbed configuration to inject SocketIo services
 */
export const socketIoTestbedConfig: TestModuleMetadata = {
    imports: [SocketIoModule.forRoot(sIoConfig)],
    providers: [],
};

export const joinServer = (userId: string, client: Socket) => {
    const serverJoinedEmitter: ServerJoinedEmitter = new ServerJoinedEmitter(client);
    serverJoinedEmitter.emit({
        userId: userId,
    });
};

export const ownerResponse = (ownerId: string, ownerName: string, enjoyerId: string, res: boolean, client: Socket) => {
    const ownerResponseEmitter = new OwnerResponseEmitter(client);
    ownerResponseEmitter.emit({
        res,
        ownerId,
        name: ownerName,
        enjoyerId
    })
};

