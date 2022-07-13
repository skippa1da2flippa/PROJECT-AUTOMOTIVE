import { Types } from "mongoose";
import { Server } from "socket.io";
import { RoomEmitter } from "./base/room-emitter";
import { EnjoyerMessage } from "../../model/events/enjoyer-reqmessage"


/**
 * Class that wraps socket.io functionality to generate a "enjoyer-request" event
 * for a specific owner.
 * This class defines how the server emits a message to the car owner advising him some "enjoyer"
 * want to connnect to his own car
 */
export class EnjoyerRequestEmitter extends RoomEmitter<EnjoyerMessage> {
    /**
     * @param ioServer socket.io server instance
     * @param ownerId id of the owner who has to be notified
     */
    public constructor(ioServer: Server, ownerId: Types.ObjectId) {
        const eventName: string = `enjoyer-request`;

        super(ioServer, eventName, ownerId.toString());
    }
}